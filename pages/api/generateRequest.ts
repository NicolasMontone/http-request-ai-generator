// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {
  Configuration,
  CreateCompletionResponseChoicesInner,
  OpenAIApi,
} from 'openai'
import { InputsValues } from '../../components/UserPromptForm/UserPromptForm.types'
import { isValidUrl } from '../../components/UserPromptForm/utils'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

type Data = {
  output?: CreateCompletionResponseChoicesInner
}

const VALID_METHODS = ['GET', 'POST', 'DELETE', 'PUT']

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { method, url, language } = req.body

  if (!isValidUrl(url) || language === '' || !VALID_METHODS.includes(method)) {
    res.status(400)
    return
  }

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(req.body),
    temperature: 0.3,
    max_tokens: 2000,
  })

  const basePromptOutput = baseCompletion.data.choices.pop()

  res.status(200).json({ output: basePromptOutput })
}

function generatePrompt({
  language,
  library,
  headers,
  method,
  url,
  body,
}: Partial<InputsValues>) {
  const prompt = `Write a code example for a HTTP request with the following options, if the language doesn't exist, just say "Invalid language try again :)": 
- Language: ${language}
${
  library
    ? `- Library: ${library} (if the library doesn't exist in this language, use don't use it).`
    : ''
}
${headers ? `- headers: "${headers}".` : ''}
- method: ${method}.
- url: ${url}.
${body ? `- Body: "${body}"` : ''}
`

  return prompt
}

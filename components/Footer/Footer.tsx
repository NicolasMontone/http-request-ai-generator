import React from 'react'
import { GithubIcon } from './GithubIcon'

const Footer = () => (
  <div className="flex justify-center items-end text-xs gap-1 pb-4">
    Made with love by Monto ❤️ |{' '}
    <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">
      Powered by Vercel
    </a>
    | and thanks to{' '}
    <a href="https://openai.com/" target="_blank" rel="noopener noreferrer">
      OpenAI
    </a>
    <a
      href="https://github.com/NicolasMontone/http-request-ai-generator"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubIcon />
    </a>
  </div>
)

export default Footer

import { useCallback, useState } from 'react'

import { CodeVisualizer } from '../components/CodeVisualizer'
import { HomeHeader } from '../components/HomeHeader'
import { Page } from '../components/Page'
import { UserPromptForm } from '../components/UserPromptForm'

const GENERATED_CODE_DEFAULT_MESSAGE = 'Your generated code goes here 🚀'

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState<string>(
    GENERATED_CODE_DEFAULT_MESSAGE,
  )
  const handleGenerateCode = useCallback((code: string) => {
    setGeneratedCode(code)
  }, [])
  return (
    <Page
      title="HTTP request generator"
      description="Generate an HTTP request for any language with Artificial Intelligence"
    >
      <main className="px-5 md:px-20 pb-6">
        <HomeHeader />
        <UserPromptForm onGenerateCode={handleGenerateCode} />
        <CodeVisualizer
          code={
            generatedCode.startsWith('\n')
              ? generatedCode.replace('\n', '')
              : generatedCode
          }
        />
      </main>
    </Page>
  )
}

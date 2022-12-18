import React from 'react'

import { atomOneDark, CopyBlock } from 'react-code-blocks'

type Props = {
  code: string
}

const CodeVisualizer = ({ code }: Props) => {
  return (
    <CopyBlock
      text={code}
      language={'bash'}
      showLineNumbers
      theme={atomOneDark}
      codeBlock
      wrapLines
    />
  )
}

export default CodeVisualizer

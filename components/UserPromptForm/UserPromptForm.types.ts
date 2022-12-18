export type InputsValues = {
  language: string
  url: string
  library: string
  method: string
  headers: string
  body: string
}

export type Props = {
  onGenerateCode: (code: string) => void
}

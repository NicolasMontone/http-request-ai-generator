import { FocusEvent } from 'react'

export type Props = {
  placeholder: string
  name: string
  value: string
  onChange: (value: string, name: string) => void
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => void
  error?: string
  className?: string
  type?: 'text' | 'textarea'
}

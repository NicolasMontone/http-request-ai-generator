import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useMemo,
} from 'react'

import { Props } from './Input.types'

const Input = ({
  placeholder,
  onChange,
  value,
  onBlur,
  name,
  error,
  className,
  type = 'text',
}: Props) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      onChange(value, name)
    },
    [name, onChange],
  )

  const handleOnBlur = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onBlur?.(event, name)
    },
    [name, onBlur],
  )
  const InputType = useMemo(
    () => (type === 'text' ? 'input' : 'textarea'),
    [type],
  )
  return (
    <div className={`flex flex-col justify-start min-h-12 ${className || ''}`}>
      <InputType
        className="rounded outline-none border border-stone-400 focus:border-violet-600 bg-black p-1"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        onBlur={handleOnBlur}
        id={name}
      />
      {error && <span className="mt-2 text-xs text-red-200">{error}</span>}
    </div>
  )
}

export default memo(Input)

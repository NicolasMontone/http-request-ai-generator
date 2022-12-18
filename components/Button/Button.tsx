import React, { memo, MouseEvent } from 'react'
import { Spinner } from '../Spinner'

type Props = {
  children: React.ReactNode
  type?: 'submit' | 'button'
  className?: string
  isLoading?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const Button = ({
  children,
  type = 'submit',
  className,
  isLoading,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`flex items-center rounded-md border border-violet-600 p-2 transition ease-in-out delay-100 bg-transparent hover:bg-gradient-to-r from-violet-600 to-indigo-400 durantion-300 ${className}`}
      type={type}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  )
}

export default memo(Button)

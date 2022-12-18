import React, { useCallback } from 'react'

import { Props } from './Tag.types'

const Tag = ({ value, isSelected, onClick }: Props) => {
  const handleTagClick = useCallback(() => {
    onClick(value)
  }, [onClick, value])

  return (
    <div
      onClick={handleTagClick}
      className={`rounded border-stone-400 border-solid border w-fit p-1 text-sm cursor-pointer ${
        isSelected ? 'border-violet-500' : ''
      }`}
    >
      {value}
    </div>
  )
}

export default React.memo(Tag)

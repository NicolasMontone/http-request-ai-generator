import React, { useCallback, useState } from 'react'

import { Tag } from '../Tag'
import { Props } from './MethodSelector.types'

const MethodSelector = ({ onSelectMethod }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('GET')

  const handleTagClick = useCallback(
    (value: string) => {
      setSelectedMethod(value)
      onSelectMethod(value)
    },
    [onSelectMethod],
  )
  return (
    <div className="flex gap-4 mt-2">
      <Tag
        value={'GET'}
        onClick={handleTagClick}
        isSelected={selectedMethod === 'GET'}
      />
      <Tag
        value={'POST'}
        onClick={handleTagClick}
        isSelected={selectedMethod === 'POST'}
      />
      <Tag
        value={'PUT'}
        onClick={handleTagClick}
        isSelected={selectedMethod === 'PUT'}
      />
      <Tag
        value={'DELETE'}
        onClick={handleTagClick}
        isSelected={selectedMethod === 'DELETE'}
      />
    </div>
  )
}

export default MethodSelector

import React, { useCallback, useState, FocusEvent, FormEvent } from 'react'

import { getErrorTextFromInvalidInput, validateForm } from './utils'
import { Input } from '../Input'
import { InputsValues, Props } from './UserPromptForm.types'
import { MethodSelector } from '../MethodSelector'
import { Button } from '../Button'

const DEFAULT_INPUTS_VALUES: InputsValues = {
  language: '',
  url: '',
  method: 'GET',
  library: '',
  headers: '',
  body: '',
}

const UserPromptForm = ({ onGenerateCode }: Props) => {
  const [values, setValues] = useState<InputsValues>(DEFAULT_INPUTS_VALUES)
  const [errors, setErrors] = useState<InputsValues>(DEFAULT_INPUTS_VALUES)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [error, setError] = useState<string>()

  const handleInputChange = useCallback(
    (value: string, name: string) => {
      setError('')
      const nameAsField = name as keyof InputsValues

      const newValues = { ...values, [nameAsField]: value }
      if (errors[nameAsField]) {
        // remove error from input if it was previously set
        errors[nameAsField] = ''
      }

      setValues(newValues)
    },
    [errors, values],
  )

  const handleInputBlur = useCallback(
    (
      { target: { value } }: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      name: string,
    ) => {
      const nameAsField = name as keyof InputsValues
      const isValidValue = validateForm(nameAsField, value)

      if (isValidValue) {
        return
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [nameAsField]: getErrorTextFromInvalidInput(nameAsField),
      }))
    },
    [],
  )

  const handleSelectMethod = useCallback((method: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      ['method']: method,
    }))
  }, [])

  const handleSubmitForm = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      if (isSubmitLoading) {
        return
      }
      setError('')
      let errorsCount = 0
      let newErrors = { ...errors }
      for (const [field, value] of Object.entries(values)) {
        const fieldAsInputValueField = field as keyof InputsValues
        if (validateForm(fieldAsInputValueField, value)) {
          continue
        }
        const inputErrorText = getErrorTextFromInvalidInput(
          fieldAsInputValueField,
        )

        if (!inputErrorText) {
          // no error, just contune to next field
          continue
        }
        newErrors = { ...newErrors, [field]: inputErrorText }
        errorsCount++
      }

      if (errorsCount > 0) {
        setErrors(newErrors)
        return
      }
      try {
        setIsSubmitLoading(true)
        const response = await fetch('/api/generateRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })

        const data = await response.json()
        const { output } = data

        onGenerateCode(output.text)
      } catch {
        setError('There was an error generating your code 😢')
      } finally {
        setIsSubmitLoading(false)
      }
    },
    [errors, isSubmitLoading, onGenerateCode, values],
  )

  return (
    <section className="flex flex-col mt-6 m-auto pb-4">
      <h3 className="text-xl font-bold gap-4">Create your request</h3>
      <form onSubmit={handleSubmitForm}>
        <div className="flex flex-col justify-start gap-2 mt-2">
          <div className="mt-2">
            <p>Select a method *</p>
            <MethodSelector onSelectMethod={handleSelectMethod} />
          </div>
          <label htmlFor="language">Language *</label>
          <Input
            value={values['language']}
            placeholder={'Could be Javascript, Typescript, C++, etc...'}
            onChange={handleInputChange}
            name={'language'}
            onBlur={handleInputBlur}
            error={errors['language']}
          />
        </div>
        <div className="flex flex-col justify-start gap-2 mt-2">
          <label htmlFor="url">Url *</label>
          <Input
            value={values['url']}
            placeholder={'https://your-amazing-url.ai'}
            onChange={handleInputChange}
            name={'url'}
            onBlur={handleInputBlur}
            error={errors['url']}
          />
        </div>
        <div className="flex flex-col justify-start gap-2 mt-2">
          <label htmlFor="library">Library</label>
          <Input
            value={values['library']}
            placeholder={'Could be Axios, Got, etc...'}
            onChange={handleInputChange}
            name={'library'}
            onBlur={handleInputBlur}
            error={errors['library']}
          />
        </div>
        <div className="flex flex-col justify-start gap-2 mt-2">
          <label htmlFor="headers">Extra headers</label>
          <Input
            value={values['headers']}
            placeholder={'Content-type: image/jpeg,...'}
            onChange={handleInputChange}
            name={'headers'}
            onBlur={handleInputBlur}
            error={errors['headers']}
            type="textarea"
          />
        </div>
        <div className="flex flex-col justify-start gap-2 mt-2">
          <label htmlFor="body">Body</label>
          <Input
            value={values['body']}
            placeholder={'"password": "very-difficult-password"'}
            onChange={handleInputChange}
            name={'body'}
            onBlur={handleInputBlur}
            error={errors['body']}
            type="textarea"
          />
        </div>
        <Button className="mt-5 float-right" isLoading={isSubmitLoading}>
          Generate
        </Button>
        <p className="text-red-200 mt-4">{error}</p>
      </form>
    </section>
  )
}

export default UserPromptForm

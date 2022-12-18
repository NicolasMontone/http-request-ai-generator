import { InputsValues } from './UserPromptForm.types'

/**
 * Helper to decide if a value is a valid Url string.
 *
 * Regex source: https://stackoverflow.com/a/15855457/6279385
 *
 * @param value
 */
export function isValidUrl(value: string): boolean {
  const urlRegExp =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return urlRegExp.test(value)
}

const optionalInputs = ['library', 'body', 'headers']

/**
 * helper function to make custom fields validations
 * @param field
 * @param value
 * @returns - boolean, if the value inserted is valid
 */
export function validateForm(
  field: keyof InputsValues,
  value: string,
): boolean {
  if (!optionalInputs.includes(field) && value === '') {
    // empty string not allowed
    return false
  }

  if (field === 'url') {
    return isValidUrl(value)
  }

  return true
}

const DEFAULT_ERROR = 'Input can not be empty'

/**
 * get error text if some field is invalid
 * @param field
 * @param value
 * @returns
 */
export function getErrorTextFromInvalidInput(
  field: keyof InputsValues,
): string {
  if (field === 'url') {
    return 'Is not a valid URL'
  }

  return DEFAULT_ERROR
}

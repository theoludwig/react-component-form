import useTranslation from 'next-translate/useTranslation'
import type { Error } from 'react-component-form'

const knownErrorKeywords = ['minLength', 'maxLength', 'format']

const getErrorTranslationKey = (error: Error): string => {
  if (knownErrorKeywords.includes(error?.keyword)) {
    if (
      error.keyword === 'minLength' &&
      typeof error.data === 'string' &&
      error.data.length === 0
    ) {
      return 'common:required'
    }
    if (error.keyword === 'format') {
      if (error.params.format === 'email') {
        return 'common:invalid-email'
      }
      return 'common:invalid'
    }
    return `common:${error.keyword}`
  }
  return 'common:invalid'
}

export const useFormTranslation = () => {
  const { t } = useTranslation()

  const getErrorTranslation = (
    error: Error | undefined
  ): string | undefined => {
    if (error != null) {
      return t(getErrorTranslationKey(error)).replace(
        '{expected}',
        error?.params?.limit
      )
    }
    return undefined
  }

  const getFirstErrorTranslation = (
    errors: Error[] | undefined
  ): string | undefined => {
    if (errors != null) {
      return getErrorTranslation(errors[0])
    }
    return undefined
  }

  return { getFirstErrorTranslation, getErrorTranslation }
}

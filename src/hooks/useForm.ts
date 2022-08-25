import { useMemo, useState } from 'react'
import { SchemaOptions, Static, TObject, Type } from '@sinclair/typebox'
import type { ErrorObject } from 'ajv'

import type { HandleForm } from '../components/Form'
import { FetchState, useFetchState } from './useFetchState'
import { ajv } from '../utils/ajv'
import { handleCheckboxBoolean } from '../utils/handleCheckboxBoolean'
import { handleOptionalEmptyStringToNull } from '../utils/handleOptionalEmptyStringToNull'

export type Schema = SchemaOptions

export type Error = ErrorObject

export type ErrorsObject<K extends Schema> = {
  [key in keyof Partial<K>]: Error[] | undefined
}

export type HandleUseFormCallback<K extends Schema> = (
  formData: Static<TObject<K>>,
  formElement: HTMLFormElement
) => Promise<Message<K> | null> | Message<K> | null

export type HandleUseForm<K extends Schema> = (
  callback?: HandleUseFormCallback<K>
) => HandleForm

export interface GlobalMessage {
  type: 'error' | 'success'
  value?: string
  properties?: undefined
}

export interface PropertiesMessage<K extends Schema> {
  type: 'error'
  value?: string
  properties: { [key in keyof Partial<K>]: string }
}

export type Message<K extends Schema> = GlobalMessage | PropertiesMessage<K>

export interface UseFormResult<K extends Schema> {
  handleUseForm: HandleUseForm<K>

  readonly fetchState: FetchState
  setFetchState: React.Dispatch<React.SetStateAction<FetchState>>

  /**
   * Global message of the form (not specific to a property).
   */
  readonly message: string | null
  setMessage: React.Dispatch<React.SetStateAction<string | null>>

  /**
   * Errors for each property.
   *
   * The array will always have at least one element (never empty) in case of errors.
   *
   * `undefined` means no errors.
   */
  readonly errors: ErrorsObject<K>
}

export const useForm = <K extends Schema>(
  validationSchema: K
): UseFormResult<typeof validationSchema> => {
  const validationSchemaObject = useMemo(() => {
    return Type.Object(validationSchema)
  }, [validationSchema])

  const [fetchState, setFetchState] = useFetchState()
  const [message, setMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<ErrorsObject<typeof validationSchema>>(
    {} as any
  )

  const validate = useMemo(() => {
    return ajv.compile(validationSchemaObject)
  }, [validationSchemaObject])

  const handleUseForm: HandleUseForm<typeof validationSchema> = (callback) => {
    return async (formData, formElement) => {
      setErrors({} as any)
      setMessage(null)
      formData = handleOptionalEmptyStringToNull(
        formData,
        validationSchemaObject.required
      )
      formData = handleCheckboxBoolean(formData, validationSchemaObject)
      const isValid = validate(formData)
      if (!isValid) {
        setFetchState('error')
        const errors: ErrorsObject<typeof validationSchema> = {} as any
        for (const property in validationSchemaObject.properties) {
          const errorsForProperty = validate.errors?.filter((error) => {
            return error.instancePath === `/${property}`
          })
          errors[property as keyof typeof validationSchema] =
            errorsForProperty != null && errorsForProperty.length > 0
              ? errorsForProperty
              : undefined
        }
        setErrors(errors)
      } else {
        setErrors({} as any)
        if (callback != null) {
          setFetchState('loading')
          const message = await callback(
            formData as Static<TObject<typeof validationSchema>>,
            formElement
          )
          if (message != null) {
            const { value = null, type, properties } = message
            setMessage(value)
            setFetchState(type)
            if (type === 'error') {
              const propertiesErrors: ErrorsObject<typeof validationSchema> =
                {} as any
              for (const property in properties) {
                propertiesErrors[property] = [
                  {
                    keyword: 'message',
                    message: properties[property],
                    instancePath: `/${property}`,
                    schemaPath: `#/properties/${property}/message`,
                    params: {},
                    data: formData[property]
                  }
                ]
              }
              setErrors(propertiesErrors)
            }
          }
        }
      }
    }
  }

  return {
    handleUseForm,
    fetchState,
    setFetchState,
    message,
    setMessage,
    errors
  }
}

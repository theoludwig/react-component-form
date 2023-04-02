import { useMemo, useState } from 'react'
import type { Static, TObject } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { ErrorObject } from 'ajv'

import type { HandleForm } from '../components/Form'
import type { FetchState } from './useFetchState'
import { useFetchState } from './useFetchState'
import { ajv } from '../utils/ajv'
import { handleCheckboxBoolean } from '../utils/handleCheckboxBoolean'
import { handleOptionalEmptyStringToNull } from '../utils/handleOptionalEmptyStringToNull'

export interface Schema {
  [property: string | symbol]: any
}

export type Error = ErrorObject

export type ErrorsObject<K extends Schema> = {
  [key in keyof Partial<K>]: Error[] | undefined
}

export type HandleUseFormCallbackResult<K extends Schema> = Message<K> | null

/**
 * @param formData Object where the keys are the name of your inputs and the current value.
 * @param formElement The HTML form element in the DOM.
 * @returns The return can be either `null` or an object with a global message of type `'error' | 'success'`.
 */
export type HandleUseFormCallback<K extends Schema> = (
  formData: Static<TObject<K>>,
  formElement: HTMLFormElement
) => Promise<HandleUseFormCallbackResult<K>> | HandleUseFormCallbackResult<K>

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
  /**
   * Function to be used with the `onSubmit` or `onChange` prop of the `<Form />` component.
   */
  handleUseForm: HandleUseForm<K>

  /**
   * The current state of the form.
   */
  readonly fetchState: FetchState
  setFetchState: React.Dispatch<React.SetStateAction<FetchState>>

  /**
   * Global message of the form (not specific to a property).
   */
  readonly message: string | undefined
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>

  /**
   * Object of errors:
   *  - Key: correspond to a property in the JSON Schema.
   *  - Value: array of {@link ErrorObject}.
   *
   *    The array will always have at least one element (never empty) in case of errors.
   *
   *    If the value is `undefined`, it means there are no errors for this property.
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
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [errors, setErrors] = useState<ErrorsObject<typeof validationSchema>>(
    {} as any
  )

  const validate = useMemo(() => {
    return ajv.compile(validationSchemaObject)
  }, [validationSchemaObject])

  const handleUseForm: HandleUseForm<typeof validationSchema> = (callback) => {
    return async (formData, formElement) => {
      setErrors({} as any)
      setMessage(undefined)
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
            const { value, type, properties } = message
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

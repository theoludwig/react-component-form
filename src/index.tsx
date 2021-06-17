import React, { useRef } from 'react'
import 'polyfill-object.fromentries'

export interface FormDataObject {
  [key: string]: FormDataEntryValue
}

export type HandleForm = (
  formData: FormDataObject,
  formElement: HTMLFormElement
) => void | Promise<void>

interface ReactFormProps
  extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit' | 'onChange'> {}

interface FormProps extends ReactFormProps {
  onSubmit?: HandleForm
  onChange?: HandleForm
}

const getFormDataObject = (formElement: HTMLFormElement): FormDataObject => {
  return Object.fromEntries<FormDataEntryValue>(new FormData(formElement))
}

const Form = (props: FormProps): JSX.Element => {
  const { onSubmit, onChange, children, ...rest } = props
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    if (onSubmit != null) {
      const formData = getFormDataObject(formRef.current as HTMLFormElement)
      await onSubmit(formData, formRef.current as HTMLFormElement)
    }
  }

  const handleChange = async (): Promise<void> => {
    if (onChange != null) {
      const formData = getFormDataObject(formRef.current as HTMLFormElement)
      await onChange(formData, formRef.current as HTMLFormElement)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </form>
  )
}

export default Form

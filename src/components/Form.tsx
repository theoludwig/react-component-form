import React, { useRef } from "react"

export interface FormDataObject {
  [key: string]: FormDataEntryValue
}

/**
 * @param formData Object where the keys are the name of your inputs and the current value.
 * @param formElement The HTML form element in the DOM.
 */
export type HandleForm = (
  formData: FormDataObject,
  formElement: HTMLFormElement,
) => void | Promise<void>

interface ReactFormProps
  extends Omit<React.HTMLProps<HTMLFormElement>, "onSubmit" | "onChange"> {}

export interface FormProps extends ReactFormProps {
  onSubmit?: HandleForm
  onChange?: HandleForm
}

export const getFormDataObject = (
  formElement: HTMLFormElement,
): FormDataObject => {
  return Object.fromEntries<FormDataEntryValue>(new FormData(formElement))
}

export const Form: React.FC<FormProps> = (props) => {
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

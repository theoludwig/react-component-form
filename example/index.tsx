import { createRoot } from 'react-dom/client'
import React from 'react'
import { Form, useForm } from 'react-component-form'
import type { HandleUseFormCallback } from 'react-component-form'

const schema = {
  inputName: {
    type: 'string',
    minLength: 3,
    maxLength: 20
  }
}

export const Example = () => {
  const { errors, handleUseForm } = useForm(schema)

  const onSubmit: HandleUseFormCallback<typeof schema> = (
    formData,
    formElement
  ) => {
    console.log(formData) // { inputName: 'value of the input validated' }
    formElement.reset()
    return null
  }

  return (
    <Form onSubmit={handleUseForm(onSubmit)}>
      <input type='text' name='inputName' />
      {errors.inputName != null && <p>{errors.inputName[0].message}</p>}

      <button type='submit'>Submit</button>
    </Form>
  )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<Example />)

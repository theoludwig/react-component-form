import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import { Form, HandleForm } from '../src'

afterEach(cleanup)

describe('<Form />', () => {
  it('should get the formData and formElement onSubmit and onChange', () => {
    let formData: { [k: string]: any } = {}
    let formElement: any = null
    const handleSubmitChange: HandleForm = (data, element) => {
      formData = data
      formElement = element
    }
    const formComponent = render(
      <Form onSubmit={handleSubmitChange} onChange={handleSubmitChange}>
        <input data-testid='input-form' type='text' name='inputName' />
        <button data-testid='button-submit' type='submit'>
          Submit
        </button>
      </Form>
    )
    const inputForm = formComponent.getByTestId(
      'input-form'
    ) as HTMLInputElement
    const buttonSubmit = formComponent.getByTestId('button-submit')
    const text = 'some random text'

    fireEvent.change(inputForm, { target: { value: text } })
    expect(formData.inputName).toEqual(text)
    expect(formElement instanceof HTMLFormElement).toBeTruthy()
    formData = {}
    formElement = null

    fireEvent.click(buttonSubmit)
    expect(Object.keys(formData).length).toEqual(1)
    expect(formData.inputName).toEqual(text)
    expect(formElement instanceof HTMLFormElement).toBeTruthy()
  })
})

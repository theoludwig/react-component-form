<h1 align="center">react-component-form</h1>

<p align="center">
  <strong>Manage React Forms with ease.</strong>
</p>

<p align="center">
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="./CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
  <br />
  <a href="https://github.com/Divlo/react-component-form/actions/workflows/build.yml"><img src="https://github.com/Divlo/react-component-form/actions/workflows/build.yml/badge.svg?branch=master" /></a>
  <a href="https://github.com/Divlo/react-component-form/actions/workflows/lint.yml"><img src="https://github.com/Divlo/react-component-form/actions/workflows/lint.yml/badge.svg?branch=master" /></a>
  <a href="https://github.com/Divlo/react-component-form/actions/workflows/test.yml"><img src="https://github.com/Divlo/react-component-form/actions/workflows/test.yml/badge.svg?branch=master" /></a>
  <br />
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release" /></a>
  <a href="https://www.npmjs.com/package/react-component-form"><img src="https://img.shields.io/npm/v/react-component-form.svg" alt="npm version"></a>
</p>

## 📜 About

**react-component-form** is a lightweight form component for [React.js](https://reactjs.org/), it allows you to get the inputs values without state thanks to `onChange` or `onSubmit` props.

There is also a [React Hooks](https://reactjs.org/docs/hooks-intro.html) to be used in combination with the `<Form />` component to validate the data with [Ajv JSON schema validator](https://ajv.js.org/), see [advanced usage](#%EF%B8%8F-advanced-usage).

Example demo: [https://react-component-form.vercel.app/](https://react-component-form.vercel.app/).

## 💾 Install

```sh
npm install --save react-component-form
```

## ⚙️ Usage

_Note: The examples use TypeScript, but obviously you can use JavaScript. Be aware that `HandleForm` is the type definition for the `onChange` and `onSubmit` props._

```tsx
import React from 'react'
import { Form } from 'react-component-form'
import type { HandleForm } from 'react-component-form'

export const Example = () => {
  const handleSubmit: HandleForm = (formData, formElement) => {
    console.log(formData) // { inputName: 'value of the input' }
    formElement.reset()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input type='text' name='inputName' />
      <button type='submit'>Submit</button>
    </Form>
  )
}
```

Basically you have access to the same props of the HTML `form` tag in React, but the `onSubmit` and the `onChange` props are differents.

Instead to get the `event` param you get `formData` and `formElement` parameters:

- `formData`: Object where the keys are the name of your inputs and the current value. Behind the scene, it uses the [FormData](https://developer.mozilla.org/docs/Web/API/FormData) constructor.
- `formElement`: The HTML form element in the DOM so for example you can access the `.reset()` method on a [HTMLFormElement](https://developer.mozilla.org/docs/Web/API/HTMLFormElement).

## ⚙️ Advanced Usage

This example shows how to use the `<Form />` component with `useForm` hook to validate the data with [Ajv JSON schema validator](https://ajv.js.org/).

You can see a more detailled example in the [./example](./example) folder.

```tsx
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
  const { handleUseForm, errors, message } = useForm(schema)

  const onSubmit: HandleUseFormCallback<typeof schema> = (
    formData,
    formElement
  ) => {
    console.log(formData) // { inputName: 'value of the input validated and type-safe' }
    formElement.reset()

    // The return can be either `null` or an object with a global message of type `'error' | 'success'`.
    return {
      type: 'success',
      message: 'Success: Form submitted'
    }
  }

  return (
    <Form onSubmit={handleUseForm(onSubmit)}>
      <input type='text' name='inputName' />
      {errors.inputName != null && <p>{errors.inputName[0].message}</p>}

      <button type='submit'>Submit</button>

      {message != null && <p>{message}</p>}
    </Form>
  )
}
```

## API

### `useForm(schema)`

#### Parameters

- `schema`: The JSON schema to validate the data (recommended to use [@sinclair/typebox](https://www.npmjs.com/package/@sinclair/typebox)).

#### Returns

- `handleUseForm(onSubmit)`: Function to be used with the `onSubmit` or `onChange` prop of the `<Form />` component.
- `fetchState = 'idle'`: The current state of the form (`'error' | 'success' | 'idle' | 'loading'`).
- `setFetchState`: Function to update the `fetchState`.
- `message`: Global message of the form (not specific to a property).
- `setMessage`: Function to update the `message`.
- `errors`: Object of errors:
  - Key: correspond to a property in the JSON Schema.
  - Value: array of [ajv `ErrorObject`](https://ajv.js.org/api.html#error-objects).
    The array will always have at least one element (never empty) in case of errors.
    If the value is `undefined`, it means there are no errors for this property.

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or
even correct a simple spelling mistake.

The steps to contribute can be found in [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

[MIT](./LICENSE)

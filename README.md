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

Demo : [https://divlo.github.io/react-component-form/](https://divlo.github.io/react-component-form/).

## 💾 Install

```sh
npm install --save react-component-form
```

## ⚙️ Usage

```tsx
import React from 'react'
import { Form, HandleForm } from 'react-component-form'

const Example = () => {
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

_Note : The example use TypeScript, but obviously you can use JavaScript. Be aware that `HandleForm` is the type definition for the `onChange` and `onSubmit` props._

Basically you have access to the same props of the HTML `form` tag in React, but the onSubmit and the onChange props are differents.

Instead to get the `event` param you get `formData` and `formElement` params :

- `formData`: It's an object where the keys are the name of your inputs and the current value. Behind the scene, it uses the [FormData](https://developer.mozilla.org/docs/Web/API/FormData) constructor.
- `formElement`: It's the actual HTML form element in the DOM so for example you can access the `.reset()` method on a [HTMLFormElement](https://developer.mozilla.org/docs/Web/API/HTMLFormElement).

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or
even correct a simple spelling mistake.

The steps to contribute can be found in [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

[MIT](./LICENSE)

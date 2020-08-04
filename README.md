<h1 align="center">react-component-form</h1>

<p align="center">
  <strong>Manage React Forms with ease.</strong>
</p>

<p align="center">
  <a href="https://gitmoji.carloscuesta.me/"><img src="https://camo.githubusercontent.com/2a4924a23bd9ef18afe793f4999b1b9ec474e48f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746d6f6a692d253230f09f989c253230f09f988d2d4646444436372e7376673f7374796c653d666c61742d737175617265" alt="Gitmoji"/></a>
  <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="https://www.npmjs.com/package/react-component-form"><img src="https://img.shields.io/npm/v/react-component-form.svg" alt="npm version"></a>
  <img src="https://github.com/Divlo/react-component-form/workflows/Node.js%20CI/badge.svg" alt="Node.js CI" />
</p>

## 📜 About

**react-component-form** is a lightweight form component for [React.js](https://reactjs.org/), it allows you to get the inputs values without state with onChange or onSubmit props.

Demo : [https://divlo.github.io/react-component-form/](https://divlo.github.io/react-component-form/).

## 💾 Install

```bash
npm install --save react-component-form
```

## ⚙️ Usage

```tsx
import React from 'react'
import Form, { HandleForm } from 'react-component-form'

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

Basically you have access to the same props of the HTML `form` tag in React, but the onSubmit and the onChange props are differents.

Instead to get the `event` params you get `formData` and `formElement` :

- `formData`: It's an object where the keys are the name of your inputs and the current value. Behind the scene, it uses the `FormData` constructor.
- `formElement`: It's the actual HTML form element in the DOM so for example you can access the `.reset()` method on a `HTMLFormElement`.

## 📄 License

[MIT](./LICENSE)

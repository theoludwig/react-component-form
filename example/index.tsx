import React from 'react'
import { createRoot } from 'react-dom/client'
import { Form, HandleForm } from 'react-component-form'

import './index.css'
import GitHubLogo from 'url:./github.jpg'

const App: React.FC = () => {
  const handleSubmit: HandleForm = (formData, formElement) => {
    console.clear()
    console.log('onSubmit: ', formData)
    formElement.reset()
  }

  const handleChange: HandleForm = (formData) => {
    console.log('onChange: ', formData)
  }

  return (
    <div className='container'>
      <h2>{'<Form />'}</h2>
      <h5 className='title-install'>npm install --save react-component-form</h5>

      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <div className='form-group'>
          <label htmlFor='name'>Name :</label>
          <input
            className='form-control'
            type='text'
            name='name'
            id='name'
            placeholder='name'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </Form>

      <div className='result-container'>
        <h4>
          Try the form and Inspect the console{' '}
          <span role='img' aria-label='smiley'>
            😃
          </span>
        </h4>
      </div>

      <div className='github-logo'>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/Divlo/react-component-form'
        >
          <img width='30px' alt='github' src={GitHubLogo} />
        </a>
      </div>
    </div>
  )
}

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<App />)

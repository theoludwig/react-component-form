import { Form, HandleUseFormCallback, useForm } from 'react-component-form'
import useTranslation from 'next-translate/useTranslation'

import { Input } from './design/Input'
import { Button } from './design/Button'
import { useFormTranslation } from '../hooks/useFormTranslation'
import { userSchema } from '../models/User'
import { FormState } from './design/FormState'

const wait = async (ms: number): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const FormExample: React.FC = () => {
  const { handleUseForm, errors, fetchState, message } = useForm(userSchema)
  const { getFirstErrorTranslation } = useFormTranslation()
  const { t } = useTranslation()

  const onSubmit: HandleUseFormCallback<typeof userSchema> = async (
    formData,
    formElement
  ) => {
    await wait(4000)
    console.log('onSubmit:', formData)
    formElement.reset()
    return {
      type: 'success',
      message: t('common:success')
    }
  }

  return (
    <section>
      <Form
        className='mt-6 w-[90%] max-w-xs'
        noValidate
        onSubmit={handleUseForm(onSubmit)}
      >
        <Input
          type='text'
          placeholder={t('common:name')}
          name='name'
          label={t('common:name')}
          error={getFirstErrorTranslation(errors.name)}
        />

        <Input
          type='text'
          placeholder='Email'
          name='email'
          label='Email'
          error={getFirstErrorTranslation(errors.email)}
        />

        <Button className='mt-6 w-full' type='submit'>
          Submit
        </Button>
      </Form>
      <FormState id='message' state={fetchState} message={message} />
    </section>
  )
}

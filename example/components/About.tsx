import Translation from 'next-translate/Trans'

import { Link } from './design/Link'
import { TextSpecial } from './design/TextSpecial'

export const About: React.FC = () => {
  return (
    <section className='text-center mt-6'>
      <h1 className='text-4xl'>{'<Form />'}</h1>
      <h2 className='text-xl dark:text-gray-300 text-gray-600 mt-4'>
        npm install --save{' '}
        <Link
          href='https://www.npmjs.com/package/react-component-form'
          target='_blank'
          rel='noopener noreferrer'
        >
          react-component-form
        </Link>
      </h2>

      <p className='max-w-lg mt-6 text-base' data-cy='main-description'>
        <Translation
          i18nKey='common:about'
          components={[<TextSpecial key='special' />]}
        />
      </p>
    </section>
  )
}

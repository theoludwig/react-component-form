import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

import { About } from '../components/About'
import { FormExample } from '../components/FormExample'
import { Header } from '../components/Header'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>react-component-form</title>
        <meta name='description' content='Manage React Forms with ease.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main className='flex flex-col justify-center items-center mt-4'>
        <About />
        <FormExample />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Home

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute='class' defaultTheme='light'>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

import type { AppType } from "next/app"
import { ThemeProvider } from "next-themes"

import "../styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

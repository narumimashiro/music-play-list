import type { AppProps } from 'next/app'
import { useEffect } from 'react'

// Recoil
import { RecoilRoot } from 'recoil'

// hooks
import { useLocaleSlug, I18NEXT_LOCALE } from '@/hooks/useLocaleSlug'

// MyComponents
import Layout from '@/components/Layout'

// i18next
import { appWithTranslation, useTranslation } from 'next-i18next'
import '@/locales/config'

// Styles
import '@/styles/globals.sass'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useThemeStyle } from '@/hooks/useThemeStyle'

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = ({ Component, pageProps }: AppProps) => {

  const theme = useThemeStyle()
  const selectedTheme = theme ? darkTheme : lightTheme
  const locale = useLocaleSlug()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale)
    localStorage.setItem(I18NEXT_LOCALE, locale)
  }, [i18n, locale])

  return (
    <RecoilRoot>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <Layout>
          <Component { ...pageProps } />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default appWithTranslation(App)
import type { AppProps } from 'next/app'

// Recoil
import { RecoilRoot } from 'recoil'

// MyComponents
import Layout from '@/components/molecules/Layout'

// i18next
import { appWithTranslation } from 'next-i18next'
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
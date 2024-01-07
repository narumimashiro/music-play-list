/**
 * [Custom hook]
 * get router query locale
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const VALID_LOCALE = ['ja-jp', 'en-us']
export const I18NEXT_LOCALE = 'i18next_locale'
export const LOCALE = {
  JAPANESE: { DEFAULT: 'ja', URL_LOCALE: 'ja-jp'},
  ENGLISH: { DEFAULT: 'en', URL_LOCALE: 'en-us'}
}

export const useLocaleSlug = () => {
  const router = useRouter()
  const { locale_slug } = router.query

  return locale_slug as string || LOCALE.JAPANESE.URL_LOCALE
}

export const useDefaultLocale = () => {
  const [defaultLocale, setDefaultLocale] = useState(LOCALE.JAPANESE.DEFAULT)

  useEffect(() => {
    setDefaultLocale(window.navigator.language)
  }, [])

  return defaultLocale
}
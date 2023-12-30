/**
 * [Custom hook]
 * get router query locale
 */

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const VALID_LOCALE = ['ja-jp', 'en-us']
export const I18NEXT_LOCALE = 'i18next_locale'

export const useLocaleSlug = () => {
  const router = useRouter()
  const { locale_slug } = router.query

  return locale_slug as string || 'ja-jp'
}

export const useDefaultLocale = () => {
  const [defaultLocale, setDefaultLocale] = useState('ja')

  useEffect(() => {
    setDefaultLocale(window.navigator.language)
  }, [])

  return defaultLocale
}
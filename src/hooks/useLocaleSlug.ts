/**
 * [Custom hook]
 * get router query locale
 */

import { useRouter } from 'next/router'

export const VALID_LOCALE = ['ja-jp', 'en-us']
export const I18NEXT_LOCALE = 'i18next_locale'

export const useLocaleSlug = () => {
  const router = useRouter()
  const { locale_slug } = router.query

  return locale_slug as string || 'ja-jp'
}

export const useDefaultLocale = () => {
  let userDefaultLang = 'ja'

  if (typeof window !== 'undefined') {
    userDefaultLang = window.navigator.language
  }

  return userDefaultLang
}
/**
 * [Custom hook]
 * get theme light mode or dark mode
 */

import { useEffect, useState } from 'react'

export const useThemeStyle = () => {

  const [isDarkMode, setDarkMode] = useState(false)

  // detected dark mode by media query
  const darkModeQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

  const darkModeChangeListener = (event: MediaQueryListEvent) => {
    setDarkMode(event.matches)
  }

  useEffect(() => {
    if (darkModeQuery) {
      // init
      setDarkMode(darkModeQuery.matches)

      // watch media query changing
      darkModeQuery.addEventListener('change', darkModeChangeListener)

      // cleanup event listener if unmounted component
      return () => {
        darkModeQuery.removeEventListener('change', darkModeChangeListener)
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isDarkMode
}
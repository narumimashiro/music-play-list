/**
 * [Custom hook]
 * get windows size portrait or landscape
 */

/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

export const ORIENTATION = {
  PORTRAIT: { SIZE: 768, HARD: 'PORTRAIT' },
  LANDSCAPE: { SIZE: 1280, HARD: 'LANDSCAPE'}
}

export const useInnerSize = () => {
  const [windowSize, setWindowSize] = useState(0)

  const handlerResize = () => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    handlerResize()
    window.addEventListener('resize', handlerResize)

    return () => {
      window.removeEventListener('resize', handlerResize)
    }
  }, [])

  return windowSize
}

export const useOrientation = () => {
  const windowSize = useInnerSize()
  return windowSize <= ORIENTATION.PORTRAIT.SIZE ? ORIENTATION.PORTRAIT.HARD : ORIENTATION.LANDSCAPE.HARD
}

export const useTabletSize = () => {
  const windowSize = useInnerSize()
  return (windowSize >= ORIENTATION.PORTRAIT.SIZE) && (windowSize < ORIENTATION.LANDSCAPE.SIZE)
}
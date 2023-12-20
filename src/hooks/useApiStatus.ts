/**
 * [Custom hook]
 * get api fetch status
 */

import { useState, useCallback } from 'react'

export const API_STATUS = {
  IDLE: 'Idle',
  LOADING: 'Loading',
  SUCCESS: 'Success',
  FAILED: 'Failed'
} as const

type AptStatusType = typeof API_STATUS[keyof typeof API_STATUS]

export const useApiStatus = () => {
  
  const [status, setStatus] = useState<AptStatusType>(API_STATUS.IDLE)

  const startLoading = useCallback(() => {
    setStatus(API_STATUS.LOADING)
  }, [])

  const setSuccess = useCallback(() => {
    setStatus(API_STATUS.SUCCESS)
  }, [])

  const setFailed = useCallback(() => {
    setStatus(API_STATUS.FAILED)
  }, [])

  return { status, startLoading, setSuccess, setFailed }
}
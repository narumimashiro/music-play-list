// hooks
import { useApiStatus } from '@/hooks/useApiStatus'

// Recoil
import { useSetRecoilState } from 'recoil'
import { prskMusicList } from '@/recoil/prskMusicList'

const GetPrskMusicList = () => {
  const { status, startLoading, setSuccess, setFailed } = useApiStatus()
  const setMusicList = useSetRecoilState(prskMusicList)

  const getPrskMusicList = async () => {
    startLoading()

    try {
      const response = await fetch('/api/getPrskMusicList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if(!response.ok) throw new Error()

      const result = await response.json()
    
      setMusicList(result)

      setSuccess()

    } catch(err) {
      setFailed()
    }
  }

  return { status, getPrskMusicList }
}
export default GetPrskMusicList
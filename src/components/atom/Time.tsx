import { useEffect, useState } from 'react'

export const Clock = () => {

  const [time, setTime] = useState('25:00')

  const timeStyle = {
    fontWeight: 'bold',
    fontSize: '24px'
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')

      setTime(`${hours} : ${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={timeStyle}>
      {time}
    </div>
  )
}

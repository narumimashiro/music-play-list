import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// MyComponents
import FooterMiku from '@/components/molecules/FooterMiku'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const router = useRouter()
  const [isDisp, setIsDisp] = useState(false)
  
  useEffect(() => {
    setIsDisp(router.pathname !== '/')
  }, [router.pathname])

  return (
    <div className={inter.className}>
      {children}
      {isDisp && <FooterMiku />}
    </div>
  )
}
export default RootLayout

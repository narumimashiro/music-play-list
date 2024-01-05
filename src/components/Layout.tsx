import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

// MyComponents
import FooterMiku from '@/components/molecules/FooterMiku'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const router = useRouter()
  const isLayourView = router.pathname === '/'

  return (
    <div className={inter.className}>
      {children}
      {!isLayourView && <FooterMiku />}
    </div>
  )
}
export default RootLayout

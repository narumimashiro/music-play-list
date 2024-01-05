import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={inter.className}>{children}</div>
  )
}
export default RootLayout

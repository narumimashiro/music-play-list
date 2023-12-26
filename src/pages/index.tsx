import { useTranslation } from 'next-i18next'

// MyComponents
import Meta from "@/components/Meta"

const Home = () => {

  const { t } = useTranslation()

  return (
    <>
    {/* TODO change meta title to suit your project */}
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'Project Title')}/>
      <div>
        <h1>Hello, NextJs!!!</h1>
      </div>
    </>
  )
}
export default Home
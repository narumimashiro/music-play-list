import { GetStaticPaths, GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

// hooks
import { VALID_LOCALE } from '@/hooks/useLocaleSlug'

// MyComponents
import Meta from '@/components/Meta'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = VALID_LOCALE.map(locale => ({
    params: {locale_slug: locale}
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { locale_slug } = params!

  return {
    props: {
      locale: locale_slug
    }
  }
}

const MainPage = () => {

  const { t } = useTranslation()

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'Top')} />
    </>
  )
}
export default MainPage
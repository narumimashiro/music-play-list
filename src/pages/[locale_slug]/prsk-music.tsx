import { GetStaticPaths, GetStaticProps } from 'next'

import styles from '@/styles/PrskMusic.module.sass'

// hooks
import { VALID_LOCALE } from '@/hooks/useLocaleSlug'

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

const PrskMusic = () => {

  return (
    <>
      <div className={styles.container}>
      </div>
    </>
  )
}
export default PrskMusic
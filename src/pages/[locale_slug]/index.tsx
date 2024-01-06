import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import styles from '@/styles/MainPage.module.sass'
import { useTranslation } from 'next-i18next'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

// hooks
import { VALID_LOCALE, useLocaleSlug } from '@/hooks/useLocaleSlug'

// MaterialUI
import {
  Toolbar,
  Typography,
} from '@mui/material'

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
  const locale = useLocaleSlug()

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'Top')} />
      <div className={`flex-center invisible-scroll ${styles.container}`}>
        <Toolbar className={styles.contents}>
          <Typography variant="h6" component="div" sx={{fontWeight: 'bold', fontSize: '24px'}}>
            {t('STRID_menulist')}
          </Typography>
          <Link href={`${locale}/prsk-music`} className={styles.menuLink}>
            {t('STRID_prsk_music_list')}
          </Link>
          <p color='inherit' className={styles.menuLink}>To be continue</p>
          <p color='inherit' className={styles.menuLink}>To be continue</p>
          <p color='inherit' className={styles.menuLink}>To be continue</p>
        </Toolbar>
        <TwitterTimelineEmbed
          sourceType='profile'
          screenName='pj_sekai'
          options={{
            width: 400,
            height: 600
          }}
        />
      </div>
    </>
  )
}
export default MainPage
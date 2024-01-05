import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

// MyComponents
import Meta from "@/components/Meta"

// hooks
import { ORIENTATION, useOrientation, useTabletSize } from '@/hooks/useWindowSize'
import { LOCALE, useDefaultLocale } from '@/hooks/useLocaleSlug'

// MaterialUI
import {
  Grid,
  Card,
  CardMedia
} from '@mui/material'

import styles from '@/styles/Home.module.sass'

const prskBanners = [
  {
    imgPath: '/images/ichika.jpg',
    alt: 'ichika'
  },
  {
    imgPath: '/images/minori.jpg',
    alt: 'minori'
  },
  {
    imgPath: '/images/kohane.jpg',
    alt: 'kohane'
  },
  {
    imgPath: '/images/tsukasa.jpg',
    alt: 'tsukasa'
  },
  {
    imgPath: '/images/kanade.jpg',
    alt: 'kanade'
  }
]

const SlideImgCard = () => {
  
  return (
    <Grid container className={styles.bannerWrap}>
      {
        prskBanners.map((el, index) => (
          <Grid item xs={12} key={index} className={styles.bannerItem}>
            <Card className={`${styles.cardItem} ${index % 2 ? styles.right : styles.left}`}>
              <CardMedia
                component='img'
                src={el.imgPath}
                alt={el.alt}
              />
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}

const Home = () => {

  const { t } = useTranslation()
  const router = useRouter()
  const defaultLocale = useDefaultLocale()
  const isJapan = useMemo(() => defaultLocale === LOCALE.JAPANESE.DEFAULT, [defaultLocale])
  const [topUrl, setTopUrl] = useState('')

  const orientation = useOrientation()
  const isTabletSize = useTabletSize()
  const isPortrait = useMemo(() => orientation === ORIENTATION.PORTRAIT.HARD, [orientation])
  const [startView, setStartView] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartView(true)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const url = `/${isJapan ? LOCALE.JAPANESE.URL_LOCALE : LOCALE.ENGLISH.URL_LOCALE}`
    setTopUrl(url)
    router.prefetch(url)
  }, [router, isJapan])

  const handlerToTop = () => {
    router.push(topUrl)
    setStartView(false)
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'Music List')}/>
      <div className={`flex-center ${styles.wrap}`}>
        {
          startView && (
            <div className={styles.textWrap} onClick={handlerToTop}>
              <div className={styles.continueText}>
                {
                  isTabletSize || isPortrait ? (
                    <p>{t('STRID_tap_to_continue')}</p>
                  ) : (
                    <p>{t('STRID_click_to_continue')}</p>
                  )
                }
              </div>
            </div>
          )
        }
        <SlideImgCard />
      </div>
    </>
  )
}
export default Home
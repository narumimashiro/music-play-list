import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import styles from '@/styles/PrskMusic.module.sass'

// MyComponents
import Meta from '@/components/Meta'
import { Clock } from '@/components/atom/Time'
import { YoutubeIframe, PlayYTModal } from '@/components/atom/Youtube'
import { Loading } from '@/components/atom/Loading'

// recoil
import { useRecoilValue } from 'recoil'
import { PrskMusicListType, prskMusicList, acquiredList } from '@/recoil/prskMusicList'
import GetPrskMusicList from '@/recoil/services/getPrskMusicList'

// hooks
import { VALID_LOCALE } from '@/hooks/useLocaleSlug'
import { API_STATUS } from '@/hooks/useApiStatus'

// lib
// import { ConsoleLog } from '@/lib/logging'

// MaterialUI
import {
  Card,
  CardContent,
  Box,
  Typography,
  Grid,
  Slider,
  IconButton
} from '@mui/material'
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded'
import Battery3BarRoundedIcon from '@mui/icons-material/Battery3BarRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'

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

type PlayingMusicType = {
  currentMusic: PrskMusicListType
}

const PlayingMusic = (props: PlayingMusicType) => {

  const { currentMusic } = props
  const { t } = useTranslation()
  const youtubeRef = useRef<HTMLDivElement>(null)
  const [ytStyle, setYtStyle] = useState({width: 0, height: 0})
  const [vocal, setVocal] = useState('')
  const [barValue, setBarValue] = useState(0)
  const [srcList, setSrcList] = useState<{type: string, src: string}[]>()
  const [musicSrc, setMusicSrc] = useState('')
  const ORIGINAL = 'original'
  const SEKAI3D = 'sekai_3d'
  const SEKAI2D = 'sekai_2d'
  const MAX = 96
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if(youtubeRef.current) {
      const { offsetWidth, offsetHeight } = youtubeRef.current
      setYtStyle({width: offsetWidth, height: offsetHeight})
    }
  }, [])

  useEffect(() => {
    if(currentMusic.unit_name.feat === '') {
      setVocal(currentMusic.unit_name.unit)
    } else {
      setVocal(`${currentMusic.unit_name.unit} × ${currentMusic.unit_name.feat}`)
    }

    const list: {type: string, src: string}[] = []
    if(currentMusic.youtube_src.original !== '') list.push({type: ORIGINAL, src: currentMusic.youtube_src.original})
    if(currentMusic.youtube_src.sekai_3d !== '') list.push({type: SEKAI3D, src: currentMusic.youtube_src.sekai_3d})
    if(currentMusic.youtube_src.sekai_2d !== '') list.push({type: SEKAI2D, src: currentMusic.youtube_src.sekai_2d})
    setSrcList(list)

  }, [currentMusic])

  useEffect(() => {
    if(srcList) {
      const range = MAX / srcList!.length
      const key = Math.floor(barValue / range)
      setMusicSrc(srcList[key].src)
    }
  }, [barValue, srcList])

  const handlerSelect = (e: Event, newValue: number | number[]) => {
    setBarValue(newValue as number)
  }

  return (
    <>
      <Card className={styles.playingMusic} raised={true}>
        <CardContent sx={{width: '100%'}}>
          <div className={styles.statusBar} >
            <SignalCellularAltRoundedIcon fontSize='small' />
            <Battery3BarRoundedIcon fontSize='small' />
          </div>
          <Clock />
          <div className={styles.youtube} ref={youtubeRef}>
            <div className={styles.overlay} style={{width: ytStyle.width, height: ytStyle.height}}></div>
            <YoutubeIframe
              srcID={musicSrc}
              autoPlay={true}
              mute={true}
            />
          </div>
          <Box className={styles.musicInfo}>
            <Typography component='div' variant='h6' sx={{fontWeight: 'bold'}}>{currentMusic.music_title}</Typography>
            <Typography variant='subtitle1' color='text.secondary' component='div'>{vocal}</Typography>
            <Typography variant='subtitle1' color='text.secondary' component='div'>{currentMusic.artist_name}</Typography>
          </Box>
          <div className={styles.selectBar}>
            <Grid container>
              {
                srcList?.map((el, index) => (
                  <Grid item key={index} xs={12 / srcList.length}>
                    {
                      el.type === ORIGINAL ? t('STRID_original') :
                      el.type === SEKAI3D ?  t('STRID_sekai3d') :
                   /* el.type === SEKAI2D */ t('STRID_sekai2d')
                    }
                  </Grid>
                ))
              }
            </Grid>
            <Slider
              value={barValue}
              onChange={handlerSelect}
              step={1}
              min={0}
              max={MAX}
              aria-labelledby='select music type bar'
            />
          </div>
          <Box sx={{mb: '25px'}}>
            <IconButton
              aria-label='previous'
            >
              <SkipPreviousIcon sx={{fontSize: 36}}/>
            </IconButton>
            <IconButton
              aria-label='play/pause'
              onClick={() => setModalOpen(true)}
            >
              <PlayArrowIcon sx={{fontSize: 48}}/>
            </IconButton>
            <IconButton
              aria-label='next'
            >
              <SkipNextIcon sx={{fontSize: 36}}/>
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <PlayYTModal
        open={modalOpen}
        srcID={musicSrc}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}

type SortListType = {
  musiclist: PrskMusicListType[],
  selectMusic: (music: PrskMusicListType) => void
}

const SortList = (props: SortListType) => {

  const { musiclist, selectMusic } = props

  return (
    <div className={`invisible-scroll ${styles.sortList}`}>
      {musiclist.map((el, index) => (
        <div key={index} onClick={() => selectMusic(el)}>
          <h3>{el.music_title}</h3>
          <p>{`${el.artist_name} / ${el.unit_name.unit} × ${el.unit_name.feat}`}</p>
        </div>
      ))}
    </div>
  )
}

const PrskMusic = () => {

  const { t } = useTranslation()
  const musicList = useRecoilValue(prskMusicList)
  const isAcquired = useRecoilValue(acquiredList)
  const { getPrskMusicList, status } = GetPrskMusicList()
  const [currentMusic, setCurrentMusic] = useState<PrskMusicListType>()

  useEffect(() => {
    if(status === API_STATUS.IDLE && !isAcquired) {
      getPrskMusicList()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(status === API_STATUS.SUCCESS || isAcquired) {
      setCurrentMusic(musicList[0])
    }
  }, [musicList, status, isAcquired])

  const selectMusic = (music: PrskMusicListType) => {
    setCurrentMusic(music)
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', t('STRID_prsk_music'))} />
      <div className={`flex-center ${styles.container}`}>
        <div className={styles.contents}>
          {
            currentMusic ? (
              <>
                <SortList
                  musiclist={musicList}
                  selectMusic={selectMusic}
                />
                <PlayingMusic
                  currentMusic={currentMusic}
                />
              </>
            ) : (
              <Loading />
            )
          }
        </div>
      </div>
    </>
  )
}
export default PrskMusic
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
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  ALL,
  VIRTUAL,
  LEONEED,
  MOREMOREJUMP,
  VIVIDBADSQUARE,
  WONDERLANDS_SHOWTIME,
  NIGHTCODE,
  PrskMusicListType,
  prskMusicList,
  acquiredList,
  selectUnit,
  sortMusicList
} from '@/recoil/prskMusicList'
import GetPrskMusicList from '@/recoil/services/getPrskMusicList'

// hooks
import { VALID_LOCALE } from '@/hooks/useLocaleSlug'
import { API_STATUS } from '@/hooks/useApiStatus'
import { useThemeStyle } from '@/hooks/useThemeStyle'

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
  IconButton,
  Toolbar,
  Button,
  List,
  ListItemButton
} from '@mui/material'
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded'
import Battery3BarRoundedIcon from '@mui/icons-material/Battery3BarRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

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

type MusicCardType = {
  musicInfo: PrskMusicListType
  onSelect: () => void
  unitColor: string
}

const MusicCard = (props: MusicCardType) => {

  const { musicInfo, onSelect, unitColor } = props
  const [isOverText, setIsOverText] = useState(false)
  const textRef = useRef<HTMLLabelElement>(null)
  const textContainerRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    const textWidth = textRef.current ? textRef.current.offsetWidth : 0
    const containerWidth = textContainerRef.current ? textContainerRef.current.offsetWidth : 0
    setIsOverText(textWidth > containerWidth)
  },[])

  return (
    <ListItemButton onClick={onSelect} className={styles.musicCard}>
      <label
        ref={textContainerRef}
        className={`${styles.musicCardHeader} ${isOverText ? styles.scrollText : ''}`}>
        <span className='text-xl-bold'>{musicInfo.music_title}</span>
        <div className={styles.webHorizon} style={{color: unitColor}}/>
        <label ref={textRef} className={`text-base ${styles.artistInfo}`}>
          <span>{`${musicInfo.artist_name} / ${musicInfo.unit_name.unit} × ${musicInfo.unit_name.feat}`}</span>
        </label>
      </label>
    </ListItemButton>
  )
}

type MusicListType = {
  onSelectMusic: (music: PrskMusicListType) => void
}

type IndexInfoType = {
  unitcolor: string,
  img: string
}

const MusicList = (props: MusicListType) => {

  const { onSelectMusic } = props
  const [sortMinimize, setSortMinimize] = useState(false)
  const selectUnitId = useSetRecoilState(selectUnit)
  const sortList = useRecoilValue(sortMusicList)
  const isDark = useThemeStyle()

  const indexInfo: {[key: string]: IndexInfoType} = {
    [VIRTUAL]: {
      unitcolor: '#7d7d7d',
      img: '/images/logo_virtual.png'
    },
    [LEONEED]: {
      unitcolor: '#4455DD',
      img: '/images/logo_leoneed.png'
    },
    [MOREMOREJUMP]: {
      unitcolor: '#88DD44',
      img: '/images/logo_moremore.png'
    },
    [VIVIDBADSQUARE]: {
      unitcolor: '#EE1166',
      img: '/images/logo_vivid.png'
    },
    [WONDERLANDS_SHOWTIME]: {
      unitcolor: '#FF9900',
      img: '/images/logo_wonderlands.png'
    },
    [NIGHTCODE]: {
      unitcolor: '#884499',
      img: '/images/logo_nightcode.png'
    }
  }

  const getUnitColor = (unit: string) => {
    switch(unit) {
    case VIRTUAL: return indexInfo[VIRTUAL].unitcolor
    case LEONEED: return indexInfo[LEONEED].unitcolor
    case MOREMOREJUMP: return indexInfo[MOREMOREJUMP].unitcolor
    case VIVIDBADSQUARE: return indexInfo[VIVIDBADSQUARE].unitcolor
    case WONDERLANDS_SHOWTIME: return indexInfo[WONDERLANDS_SHOWTIME].unitcolor
    case NIGHTCODE: return indexInfo[NIGHTCODE].unitcolor
    default: return isDark ? '#FFF' : '#000'
    }
  }

  return (
    <div className={styles.musicList}>
      <Toolbar className={styles.indexUnit}>
        {
          sortMinimize ? (
            <IconButton aria-label='maximize button' onClick={() => setSortMinimize(false)}>
              <ChevronRightIcon />
            </IconButton>
          ) : (
            <IconButton aria-label='minimize button' onClick={() => setSortMinimize(true)}>
              <ChevronLeftIcon fontSize='large' />
            </IconButton>
          )
        }
        <Button
          className={styles.allButton}
          onClick={() => selectUnitId(ALL)}
        >
          <label>ALL</label>
        </Button>
        {
          Object.entries(indexInfo).map(([key, value]) => (
            <Button
              key={key}
              className={styles.unitButton}
              onClick={() => selectUnitId(key)}
            >
              <img src={value.img} alt={key} />
            </Button>
          ))
        }
      </Toolbar>
      <List className='invisible-scroll' sx={{marginRight: '10px'}}>
        {sortList.map(el => (
          <MusicCard
            key={el.music_title}
            musicInfo={el}
            onSelect={() => onSelectMusic(el)}
            unitColor={getUnitColor(el.id)}
          />
        ))}
      </List>
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
                <MusicList
                  onSelectMusic={selectMusic}
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
import { useMemo } from 'react'
import styles from '@/styles/molecules/FooterMiku.module.sass'

// MaterialUI
import { Grid } from '@mui/material'

// hooks
import { ORIENTATION, useOrientation } from '@/hooks/useWindowSize'

const FooterMiku = () => {

  const orientation = useOrientation()
  const isPortrait = useMemo(() => orientation === ORIENTATION.PORTRAIT.HARD, [orientation])

  return (
    <>
      {
        isPortrait ? (
          <></>
        ) : (
          <Grid container className={styles.mikuFooter}>
            <Grid item xs={4} className='flex-center'>
              <a href="https://piapro.jp/license/pcl/summary" target="_blank" rel='noopener noreferrer'>
                <img src='/images/logo_piapro.png' alt=''/>
              </a>
            </Grid>
            <Grid item xs={4} className={`flex-center ${styles.prsk}`}>
              <a href="https://pjsekai.sega.jp/" target="_blank" rel='noopener noreferrer'>
                <img src='/images/logo_prsk.png' alt=''/>
              </a>
            </Grid>
            <Grid item xs={4} className='flex-center'>
              <a href="https://www.crypton.co.jp/" target="_blank" rel='noopener noreferrer'>
                <img src='/images/logo_crypton.png' alt=''/>
              </a>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}
export default FooterMiku
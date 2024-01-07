
// MaterialUI
import {
  Modal,
  Box
} from '@mui/material'

type YoutubeIframeType = {
  srcID: string,
  autoPlay: boolean,
  mute: boolean,
}

export const YoutubeIframe = (props: YoutubeIframeType) => {

  const { srcID, autoPlay, mute } = props

  return (
    <iframe
      style={{width: '100%', height: '100%'}}
      src={`https://www.youtube.com/embed/${srcID}${autoPlay ? '&autoplay=1' : ''}${mute ? '&mute=1' : ''}`}
      title='YouTube video'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
      id='ytplayer'
    />
  )
}

type PlayYTModalType = {
  open: boolean
  srcID: string
  onClose: () => void
}

export const PlayYTModal = (props: PlayYTModalType) => {

  const { open, srcID, onClose } = props

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby='play youtube modal'
        aria-describedby='play youtube'
      >
        <Box
          className='flex-center'
          sx={{
            width: '80%',
            aspectRatio: 1.77 / 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <YoutubeIframe
            srcID={srcID}
            autoPlay={true}
            mute={false}
          />
        </Box>
      </Modal>
    </>
  )
}
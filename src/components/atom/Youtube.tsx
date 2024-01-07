
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
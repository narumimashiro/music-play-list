import Head from 'next/head'

const Meta = (props: { pageTitle: string }) => {

  const { pageTitle } = props

  return (
    <Head>
      <title>{ pageTitle }</title>
      <meta name='description' content='Shared Calendar' />
      <meta charSet='UTF-8' />
      <meta http-equiv='Content-Language' content='ja' />
      <meta property='og:title' content='Shared Calendar' />
      <meta property='og:description' content='Share Calendar with your friends' />
      {/* TODO change url images path */}
      <meta property='og:image' content='/favicon.ico' />
      {/* TODO change prod url */}
      <meta property='og:url' content={`${process.env.PROD_URL}`} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
export default Meta
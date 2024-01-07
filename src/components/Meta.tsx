import Head from 'next/head'

const Meta = (props: { pageTitle: string }) => {

  const { pageTitle } = props

  return (
    <Head>
      <title>{ pageTitle }</title>
      <meta name='description' content='music list' />
      <meta charSet='UTF-8' />
      <meta http-equiv='Content-Language' content='ja' />
      <meta property='og:title' content='music list' />
      <meta property='og:description' content='search and listen music easily' />
      <meta property='og:image' content='/favicon.ico' />
      {/* TODO change prod url */}
      <meta property='og:url' content={`${process.env.PROD_URL}`} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}
export default Meta
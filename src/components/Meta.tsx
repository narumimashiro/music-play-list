import Head from 'next/head'

const Meta = (props: { pageTitle: string }) => {

  const { pageTitle } = props

  return (
    <Head>
      <title>{ pageTitle }</title>
      {/* TODO change content description to suit your project */}
      <meta name='description' content='change description' />
      <meta charSet='UTF-8' />
      <meta http-equiv='Content-Language' content='ja' />
      {/* TODO change title to suit your project */}
      <meta property='og:title' content='change title' />
      {/* TODO change description to suit your project*/}
      <meta property='og:description' content='change description' />
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
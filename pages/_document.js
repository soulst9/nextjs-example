import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const basePath = process.env.APP_ENV === 'development' ? '/manage' : '';

  return (
    <Html lang="ko">
      <Head>
      <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        {/* <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/favicon-16x16.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} /> */}
        <link rel="manifest" href={`${basePath}/site.webmanifest`} />
        <meta name="theme-color" content="#ffffff" />
      </Head>      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

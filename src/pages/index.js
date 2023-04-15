import Head from 'next/head'
import SignInPage from './login'

const centerStyle = {
  "display": "flex",
  "justify-content": "center",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Dan's Task Manager</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={centerStyle}>
          <SignInPage></SignInPage>
        </div>
      </main>
    </>
  )
}
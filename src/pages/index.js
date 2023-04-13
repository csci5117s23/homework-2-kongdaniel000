import Head from 'next/head'
import SignUpPage from './login'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Dan's Task Manager</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <SignUpPage ></SignUpPage>
      </main>
    </>
  )
}
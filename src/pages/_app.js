import { ClerkProvider } from '@clerk/nextjs'
import "../styles/main.css"

export default function App({ Component, pageProps }) {
  
  return (
  <ClerkProvider {...pageProps} >

    <Component {...pageProps} />

  </ClerkProvider>
  )
}
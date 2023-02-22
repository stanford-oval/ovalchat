import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContext } from '../lib/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthContext.Provider value={{}}>
    <Component {...pageProps} />
  </AuthContext.Provider>
}

export default MyApp

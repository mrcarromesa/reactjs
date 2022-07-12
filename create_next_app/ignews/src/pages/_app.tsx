import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import '../styles/global.scss';

const MyApp:React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextAuthProvider session={pageProps.session} >
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp

// _app.tsx
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
  const pageKey = router.asPath
  return (
    <ThemeProvider attribute="class">
      <AnimatePresence initial={false} mode="popLayout">
        <Component key={pageKey} {...pageProps} />
      </AnimatePresence>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Provider as PhoenixProvider } from 'phoenix-provider';
import { usePrefersColorScheme } from '@gsmlg/react/dist/hooks/usePrefersColorScheme';

import getTheme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

import '../styles/globals.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const colorScheme = usePrefersColorScheme();
  const theme = getTheme(colorScheme);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <PhoenixProvider url={'/socket'} options={{ params: {token: 'anonymous' }}}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </PhoenixProvider>
    </CacheProvider>
  );
}


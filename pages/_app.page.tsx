import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

import './styles.css';

// Create a client
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default MyApp;

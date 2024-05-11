import React from 'react';

import { AppProps } from 'next/app';

import './styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;

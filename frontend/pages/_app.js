import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { StateProvider } from '../StateProviders';
import reducer, { initialState } from '../reducer';
import { SnackbarProvider } from 'notistack'

import { AuthProvider } from './../Components/withAuth'

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>HCDTI</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      {/* <AuthProvider> */}
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <StateProvider initialState={initialState} reducer={reducer} >
              <Component {...pageProps} />
            </StateProvider>
          </SnackbarProvider>
        </ThemeProvider>
      {/* </AuthProvider> */}
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

import '@/styles/globals.css';

import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';

import Layout from '@/components/layout/layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="ga-script">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};
App.defaultProps = {
  Component: null,
  pageProps: {},
};

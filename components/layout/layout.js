import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React from 'react';

import Footer from './footer';
import Header from './header';
import classes from './layout.module.css';

const Layout = (props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/site/favicon.ico" sizes="any" />
      </Head>
      <DefaultSeo
        title="Yonshan's Blog"
        description="I post about programming and web development."
        openGraph={{
          title: "Yonshan's Blog",
          description: 'I post about programming and web development.',
          images: [
            {
              url: '/images/site/yonshan.jpeg',
              width: 400,
              height: 400,
              alt: 'An image showing Yonshan',
              type: 'image/jpeg',
            },
          ],
          type: 'website',
          locale: 'zh_tw',
          url: 'https://blog.yonshan.dev/',
          siteName: "Yonshan's Blog",
        }}
        twitter={{
          handle: '@huangyonshan',
          site: '@huangyonshan',
          cardType: 'summary_large_image',
        }}
      />
      <Header />
      <div className={classes.container}>
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
Layout.defaultProps = {
  children: null,
};

export default Layout;

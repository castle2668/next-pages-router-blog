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
        title="Sean's Blog"
        description="I post about programming and web development."
        openGraph={{
          title: "Sean's Blog",
          description: 'I post about programming and web development.',
          images: [
            {
              url: '/images/site/avatar.jpeg',
              width: 400,
              height: 400,
              alt: 'An image showing avatar',
              type: 'image/jpeg',
            },
          ],
          type: 'website',
          locale: 'zh_tw',
          url: 'https://www.seanhuang.dev/',
          siteName: "Sean's Blog",
        }}
        twitter={{
          handle: '@castle2668',
          site: '@castle2668',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'author',
            content: 'castle2668',
          },
          {
            name: 'keywords',
            content:
              'sean blog, programming, web development, frontend, javascript, react, next.js, ant design, css, eslint, git, html, information ethics, life, lodash, nuk, open data, operating system, prettier, quasar, redux, redux toolkit, react router, sdg, swr, styled components, vue, movie',
          },
        ]}
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

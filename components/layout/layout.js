import Head from 'next/head';
import { DefaultSeo, NextSeo } from 'next-seo';
import React from 'react';

import Footer from './footer';
import Header from './header';
import classes from './layout.module.css';

const Layout = (props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="images/site/favicon.png" />
      </Head>
      <DefaultSeo
        title="Shou's Blog"
        description="I post about programming and web development."
        openGraph={{
          title: "Shou's Blog",
          description: 'I post about programming and web development.',
          images: [
            {
              url: '/images/site/shou.jpeg',
              width: 400,
              height: 400,
              alt: 'An image showing Shou',
              type: 'image/jpeg',
            },
          ],
          type: 'website',
          locale: 'zh_tw',
          url: 'https://blog.eishou.dev/',
          siteName: "Shou's Blog",
        }}
        twitter={{
          handle: '@huangyunghsiang',
          site: '@huangyunghsiang',
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

export default Layout;

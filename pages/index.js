import Head from 'next/head';
import React from 'react';

import FeaturedPosts from '@/components/home-page/featured-posts';
import Hero from '@/components/home-page/hero';
import { getFeaturedPosts } from '@/utils/posts-util';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>{`Yunghsiang' Blog`}</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate: 1800, // 30 minutes
  };
}

export default HomePage;

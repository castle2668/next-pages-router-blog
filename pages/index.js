import Head from 'next/head';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts } from '@/utils/posts-util';

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
      <AllPosts posts={props.posts} />
    </>
  );
}

export const getStaticProps = () => {
  const paginatedPosts = getPaginatedPosts(1);

  return {
    props: {
      posts: paginatedPosts,
    },
  };
};

export default HomePage;

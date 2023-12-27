import Head from 'next/head';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getAllPosts } from '@/utils/posts-util';

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
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

export default HomePage;

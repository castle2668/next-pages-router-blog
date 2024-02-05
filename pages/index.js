import Head from 'next/head';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts } from '@/utils/posts-util';

function HomePage(props) {
  return (
    <>
      <Head>
        <title>{`Shou' Blog`}</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <AllPosts
        posts={props.posts}
        currentPage={props.currentPage}
        numPages={props.numPages}
      />
    </>
  );
}

export const getStaticProps = () => {
  const { posts, currentPage, numPages } = getPaginatedPosts(1);

  return {
    props: {
      posts,
      currentPage,
      numPages,
    },
  };
};

export default HomePage;

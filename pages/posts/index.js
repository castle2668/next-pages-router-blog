import Head from 'next/head';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts } from '@/utils/posts-util';

const AllPostsPage = (props) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export const getStaticProps = () => {
  const paginatedPosts = getPaginatedPosts(1);

  return {
    props: {
      posts: paginatedPosts,
    },
  };
};

export default AllPostsPage;

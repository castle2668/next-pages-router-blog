import Head from 'next/head';
import React from 'react';

import AllTags from '@/components/tags/all-tags';
import { getAllPosts } from '@/utils/posts-util';

const AllTagsPage = (props) => {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>標籤列表</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <AllTags posts={posts} />
    </>
  );
};

export default AllTagsPage;

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

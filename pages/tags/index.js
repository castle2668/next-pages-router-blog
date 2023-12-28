import Head from 'next/head';
import React from 'react';

import AllTags from '@/components/tags/all-tags';
import { getAllPosts } from '@/utils/posts-util';
import { getAllTags } from '@/utils/tags-util';

const AllTagsPage = (props) => {
  const { tags } = props;

  return (
    <>
      <Head>
        <title>標籤列表</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <AllTags tags={tags} />
    </>
  );
};

export default AllTagsPage;

export const getStaticProps = () => {
  const allPosts = getAllPosts();
  const allTags = getAllTags(allPosts);

  return {
    props: {
      tags: allTags,
    },
  };
};

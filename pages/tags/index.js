import { NextSeo } from 'next-seo';
import React from 'react';

import AllTags from '@/components/tags/all-tags';
import { getAllPosts } from '@/utils/posts-util';
import { getAllTags } from '@/utils/tags-util';

const AllTagsPage = (props) => {
  const { tags } = props;

  return (
    <>
      <NextSeo
        title="標籤列表 | Shou's Blog"
        canonical="https://blog.eishou.dev/tags"
        openGraph={{
          url: 'https://blog.eishou.dev/tags',
          title: "標籤列表 | Shou's Blog",
        }}
      />
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

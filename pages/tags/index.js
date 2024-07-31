import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React from 'react';

import AllTags from '@/components/tags/all-tags';
import { getAllPosts } from '@/utils/posts-util';
import { getAllTags } from '@/utils/tags-util';

const AllTagsPage = (props) => {
  const { tags } = props;

  return (
    <>
      <NextSeo
        title="標籤列表 | Sean's Blog"
        canonical="https://www.seanhuang.dev/tags"
        openGraph={{
          url: 'https://www.seanhuang.dev/tags',
          title: "標籤列表 | Sean's Blog",
        }}
      />
      <AllTags tags={tags} />
    </>
  );
};

AllTagsPage.propTypes = {
  tags: PropTypes.array,
};
AllTagsPage.defaultProps = {
  tags: [],
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

import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React from 'react';

import ArchivesList from '@/components/archives-page/archives-list';
import { getArchives, getPostsCount } from '@/utils/archives-util';

const ArchivesPage = (props) => {
  const { posts, count } = props;

  return (
    <>
      <NextSeo
        title="Archives | Sean's Blog"
        canonical="https://www.seanhuang.dev/archives"
        openGraph={{
          url: 'https://www.seanhuang.dev/archives',
          title: "Archives | Sean's Blog",
        }}
      />
      <ArchivesList posts={posts} count={count} />
    </>
  );
};

export const getStaticProps = () => {
  const archives = getArchives();
  const count = getPostsCount();

  return {
    props: {
      posts: archives,
      count,
    },
  };
};

export default ArchivesPage;

ArchivesPage.propTypes = {
  posts: PropTypes.array,
  count: PropTypes.number,
};
ArchivesPage.defaultProps = {
  posts: [],
  count: 0,
};

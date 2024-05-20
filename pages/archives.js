import { NextSeo } from 'next-seo';
import React from 'react';

import ArchivesList from '@/components/archives-page/archives-list';
import { getArchives, getPostsCount } from '@/utils/archives-util';

const ArchivesPage = (props) => {
  const { posts, count } = props;

  return (
    <>
      <NextSeo
        title="Archives | 大貓的第一個家"
        canonical="https://www.damao.dev/archives"
        openGraph={{
          url: 'https://www.damao.dev/archives',
          title: 'Archives | 大貓的第一個家',
        }}
      />
      <ArchivesList posts={posts} count={count} />
    </>
  );
};

export default ArchivesPage;

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

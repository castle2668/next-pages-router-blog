import { NextSeo } from 'next-seo';
import React from 'react';

import ArchivesList from '@/components/archives-page/archives-list';
import { getArchives, getPostsCount } from '@/utils/archives-util';

const ArchivesPage = (props) => {
  const { posts, count } = props;

  return (
    <>
      <NextSeo
        title="Archives | Yonshan's Blog"
        canonical="https://blog.yonshan.dev/archives"
        openGraph={{
          url: 'https://blog.yonshan.dev/archives',
          title: "Archives | Yonshan's Blog",
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

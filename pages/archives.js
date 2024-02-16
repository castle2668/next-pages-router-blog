import { NextSeo } from 'next-seo';
import React from 'react';

import ArchivesList from '@/components/archives-page/archives-list';
import { getArchives } from '@/utils/archives-util';

const ArchivesPage = (props) => {
  const { posts } = props;

  return (
    <>
      <NextSeo
        title="Archives | Shou's Blog"
        canonical="https://blog.eishou.dev/archives"
        openGraph={{
          url: 'https://blog.eishou.dev/archives',
          title: "Archives | Shou's Blog",
        }}
      />
      <ArchivesList posts={posts} count={posts.length} />
    </>
  );
};

export default ArchivesPage;

export const getStaticProps = () => {
  const archives = getArchives();

  return {
    props: {
      posts: archives,
    },
  };
};

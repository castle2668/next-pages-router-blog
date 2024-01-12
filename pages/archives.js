import Head from 'next/head';
import React from 'react';

import ArchivesList from '@/components/archives-page/archives-list';
import { getArchives } from '@/utils/archives-util';

const ArchivesPage = (props) => {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>Archives</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
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

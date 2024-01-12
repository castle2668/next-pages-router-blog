import Head from 'next/head';
import React from 'react';

import TagDetail from '@/components/tags/tag-detail';
import { getAllPosts } from '@/utils/posts-util';
import { getAllTags, getTagData } from '@/utils/tags-util';

const TagDetailPage = (props) => {
  const { tag, posts } = props;

  return (
    <>
      <Head>
        <title>{tag.name}</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <TagDetail tag={tag} posts={posts} />
    </>
  );
};

export default TagDetailPage;

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const { tag, posts } = getTagData(slug);

  return {
    props: {
      tag,
      posts,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = () => {
  const allPosts = getAllPosts();
  const allTags = getAllTags(allPosts);
  const tagPaths = allTags.map((tag) => ({
    params: {
      slug: tag.slug,
    },
  }));

  return {
    paths: tagPaths,
    fallback: false,
  };
};

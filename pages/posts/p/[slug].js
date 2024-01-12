import Head from 'next/head';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts, getPostPaths } from '@/utils/posts-util';

const PaginatedPostsPage = (props) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts
        posts={props.posts}
        currentPage={props.currentPage}
        numPages={props.numPages}
      />
    </>
  );
};

export default PaginatedPostsPage;

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const { posts, currentPage, numPages } = getPaginatedPosts(slug);

  return {
    props: {
      posts,
      currentPage,
      numPages,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = () => {
  const postPaths = getPostPaths();

  return {
    paths: postPaths,
    fallback: false,
  };
};

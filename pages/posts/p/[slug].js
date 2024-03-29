import { NextSeo } from 'next-seo';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts, getPostPaths } from '@/utils/posts-util';

const PaginatedPostsPage = (props) => {
  return (
    <>
      <NextSeo
        canonical={`https://blog.yonshan.dev/posts/p/${props.currentPage}`}
        openGraph={{
          url: `https://blog.yonshan.dev/posts/p/${props.currentPage}`,
        }}
      />
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

import { NextSeo } from 'next-seo';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts } from '@/utils/posts-util';

const AllPostsPage = (props) => {
  return (
    <>
      <NextSeo
        canonical="https://blog.yonshan.dev/posts"
        openGraph={{
          url: 'https://blog.yonshan.dev/posts',
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

export const getStaticProps = () => {
  const { posts, currentPage, numPages } = getPaginatedPosts(1);

  return {
    props: {
      posts,
      currentPage,
      numPages,
    },
  };
};

export default AllPostsPage;

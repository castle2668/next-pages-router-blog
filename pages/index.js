import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts } from '@/utils/posts-util';

function HomePage(props) {
  return (
    <AllPosts
      posts={props.posts}
      currentPage={props.currentPage}
      numPages={props.numPages}
    />
  );
}

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

export default HomePage;

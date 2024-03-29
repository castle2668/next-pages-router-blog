import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
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

AllPostsPage.propTypes = {
  posts: PropTypes.array,
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
};
AllPostsPage.defaultProps = {
  posts: [],
  currentPage: 1,
  numPages: 1,
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

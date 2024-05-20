import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React from 'react';

import AllPosts from '@/components/posts/all-posts';
import { getPaginatedPosts, getPostPaths } from '@/utils/posts-util';

const PaginatedPostsPage = (props) => {
  return (
    <>
      <NextSeo
        canonical={`https://www.damao.dev/posts/p/${props.currentPage}`}
        openGraph={{
          url: `https://www.damao.dev/posts/p/${props.currentPage}`,
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

PaginatedPostsPage.propTypes = {
  posts: PropTypes.array,
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
};
PaginatedPostsPage.defaultProps = {
  posts: [],
  currentPage: 1,
  numPages: 1,
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

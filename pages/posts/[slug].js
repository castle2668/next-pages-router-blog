import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React from 'react';

import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/utils/posts-util';

const PostDetailPage = (props) => {
  return (
    <>
      <NextSeo
        title={`${props.post.title} | 大貓的第一個家`}
        description={props.post.excerpt}
        canonical={`https://www.damao.dev/posts/${props.post.slug}`}
        openGraph={{
          url: `https://www.damao.dev/posts/${props.post.slug}`,
          title: `${props.post.title} | 大貓的第一個家`,
          description: props.post.excerpt,
        }}
      />
      <PostContent post={props.post} />
    </>
  );
};

PostDetailPage.propTypes = {
  post: PropTypes.object,
};
PostDetailPage.defaultProps = {
  post: {},
};

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
  };
};

export const getStaticPaths = () => {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ''));
  const postPaths = slugs.map((slug) => ({
    params: {
      slug: slug,
    },
  }));

  return {
    paths: postPaths,
    fallback: false,
  };
};

export default PostDetailPage;

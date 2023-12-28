import Head from 'next/head';
import React from 'react';

import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/utils/posts-util';

const PostDetailPage = (props) => {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
};

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
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

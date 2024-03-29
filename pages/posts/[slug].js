import { NextSeo } from 'next-seo';
import React from 'react';

import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/utils/posts-util';

const PostDetailPage = (props) => {
  console.log(props);
  return (
    <>
      <NextSeo
        title={`${props.post.title} | Yonshan's Blog`}
        description={props.post.excerpt}
        canonical={`https://blog.yonshan.dev/posts/${props.post.slug}`}
        openGraph={{
          url: `https://blog.yonshan.dev/posts/${props.post.slug}`,
          title: `${props.post.title} | Yonshan's Blog`,
          description: props.post.excerpt,
        }}
      />
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

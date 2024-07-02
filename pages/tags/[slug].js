import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React from 'react';

import TagDetail from '@/components/tags/tag-detail';
import { getAllPosts } from '@/utils/posts-util';
import { getAllTags, getTagData } from '@/utils/tags-util';

const TagDetailPage = (props) => {
  const { tag, posts } = props;

  return (
    <>
      <NextSeo
        title={`${tag.name} | 大貓的第一個家`}
        canonical={`https://www.damao.dev/tags/${tag.slug}`}
        openGraph={{
          url: `https://www.damao.dev/tags/${tag.slug}`,
          title: `${tag.name} | 大貓的第一個家`,
        }}
      />
      <TagDetail tag={tag} posts={posts} />
    </>
  );
};

TagDetailPage.propTypes = {
  tag: PropTypes.object,
  posts: PropTypes.array,
};
TagDetailPage.defaultProps = {
  tag: {},
  posts: [],
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

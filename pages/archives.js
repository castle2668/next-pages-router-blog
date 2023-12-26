import Head from 'next/head';
import React from 'react';

import ArchivesList from '@/components/archives-page/archives-list';
import { getAllPosts } from '@/utils/posts-util';

const monthAbbreviations = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const addMonthProperty = (posts) => {
  return posts.map((post) => {
    const postDate = new Date(post.date);
    return {
      ...post,
      month: monthAbbreviations[postDate.getMonth()],
    };
  });
};
const extractYearFromDate = (dateString) => new Date(dateString).getFullYear();
const groupByYear = (posts) => {
  // 創建以年份為鍵的物件
  const postsByYear = {};
  // 將文章分類到對應的年份
  posts.forEach((post) => {
    const year = extractYearFromDate(post.date);
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });
  // 將物件轉換為陣列
  const postsByYearArray = Object.entries(postsByYear).map(([year, posts]) => ({
    year: parseInt(year, 10),
    posts,
  }));
  return postsByYearArray;
};

const ArchivesPage = (props) => {
  const { posts } = props;
  const postsWithMonth = addMonthProperty(posts);
  const postsByYear = groupByYear(postsWithMonth);

  return (
    <>
      <Head>
        <title>Archives</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <ArchivesList posts={postsByYear} count={posts.length} />
    </>
  );
};

export default ArchivesPage;

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

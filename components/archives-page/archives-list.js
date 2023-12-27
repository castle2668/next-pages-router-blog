import Link from 'next/link';
import React from 'react';

import classes from './archives-list.module.scss';

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
  const postsByYearArray = Object.entries(postsByYear)
    .map(([year, posts]) => ({
      year: parseInt(year, 10),
      posts,
    }))
    .sort((a, b) => b.year - a.year);

  return postsByYearArray;
};

const ArchivesList = (props) => {
  const { posts, count } = props;
  const postsWithMonth = addMonthProperty(posts);
  const postsByYear = groupByYear(postsWithMonth);

  return (
    <section className={classes.archives}>
      <h2>Archives</h2>
      <p>目前總共有 {count} 篇文章 d(`･∀･)b</p>
      {postsByYear.map((yearPosts) => (
        <div key={yearPosts.year}>
          <h3>{yearPosts.year}</h3>
          <ul>
            {yearPosts.posts.map((post) => (
              <li key={post.slug}>
                <span>{post.month}</span>{' '}
                <Link href={`/posts/${post.slug}`} alt={post.title}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default ArchivesList;

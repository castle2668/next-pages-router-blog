import Link from 'next/link';
import React from 'react';

import classes from './archives-list.module.scss';

const ArchivesList = (props) => {
  const { posts, count } = props;

  return (
    <section className={classes.archives}>
      <h2>Archives</h2>
      <p>目前總共有 {count} 篇文章 d(`･∀･)b</p>
      {posts.map((yearPosts) => (
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

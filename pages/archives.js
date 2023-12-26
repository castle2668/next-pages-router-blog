import Link from 'next/link';
import React from 'react';

import { getAllPosts } from '@/utils/posts-util';

const ArchivesPage = (props) => {
  const posts = props.posts.map((post) => {
    return { title: post.title, url: `/posts/${post.slug}` };
  });
  const count = posts.length;

  return (
    <>
      <h1>Archives</h1>
      <p>目前總共有 {count} 篇文章 d(`･∀･)b</p>
      <ul>
        {posts.map((post) => (
          <li key={post.url}>
            <Link href={post.url} alt={post.title}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
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

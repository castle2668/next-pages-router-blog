import Link from 'next/link';
import React from 'react';

import classes from './all-tags.module.scss';

const groupByTag = (posts) => {
  // 創建以標籤為鍵的物件
  const postsByTag = {};

  // 將文章分類到對應的標籤
  posts.forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(post);
      });
    }
    // else {
    //   // 如果文章沒有標籤，可以放入一個預設的標籤，例如 "NoTag"
    //   const defaultTag = 'NoTag';
    //   if (!postsByTag[defaultTag]) {
    //     postsByTag[defaultTag] = [];
    //   }
    //   postsByTag[defaultTag].push(post);
    // }
  });

  // 將物件轉換為陣列
  const postsByTagArray = Object.entries(postsByTag).map(([tag, posts]) => ({
    tag,
    posts,
  }));

  return postsByTagArray;
};

const TagsList = (props) => {
  const { posts } = props;

  const postsByTag = groupByTag(posts);

  return (
    <section className={classes.tags}>
      <h2>Tags</h2>
      <p>目前總共有 {postsByTag.length} 個標籤 (`・ω・´)</p>
      <ul>
        {postsByTag.map((tagPosts) => (
          <li key={tagPosts.tag}>
            <Link href={`/tags${tagPosts.tag}`}>
              {tagPosts.tag} ({tagPosts.posts.length})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TagsList;

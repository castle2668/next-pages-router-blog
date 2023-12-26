import React from 'react';

import PostsItem from './posts-item';
import classes from './posts-list.module.scss';

const PostsList = (props) => {
  const { posts } = props;

  return (
    <ul className={classes.list}>
      {posts.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsList;

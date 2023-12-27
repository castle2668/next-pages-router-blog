import React from 'react';

import classes from './all-posts.module.css';
import PostsItem from './posts-item';

const AllPosts = (props) => {
  const { posts } = props;

  return (
    <section className={classes.posts}>
      <ul className={classes.list}>
        {posts.map((post) => (
          <PostsItem key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  );
};

export default AllPosts;

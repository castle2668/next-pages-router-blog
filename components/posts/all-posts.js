import React from 'react';

import classes from './all-posts.module.css';
import PostsList from './posts-list';

const AllPosts = (props) => {
  return (
    <section className={classes.posts}>
      <PostsList posts={props.posts} />
    </section>
  );
};

export default AllPosts;

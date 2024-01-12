import React from 'react';

import AllPosts from '../posts/all-posts';
import classes from './tag-detail.module.css';

const TagDetail = (props) => {
  const { tag, posts } = props;

  return (
    <section className={classes.tag}>
      <h2>#{tag.name}</h2>
      <AllPosts posts={posts} />
    </section>
  );
};

export default TagDetail;

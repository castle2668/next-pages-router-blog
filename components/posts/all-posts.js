import React, { useEffect, useState } from 'react';

import Pagination from '../ui/pagination';
import classes from './all-posts.module.css';
import PostsItem from './posts-item';

const AllPosts = (props) => {
  const { posts, currentPage, numPages } = props;

  // 當有 currentPage 和 numPages 時，才顯示 Pagination
  const [showPagination, setShowPagination] = useState(false);
  useEffect(() => {
    setShowPagination(currentPage && numPages);
  }, [currentPage, numPages]);

  return (
    <section className={classes.posts}>
      <ul className={classes.list}>
        {posts.map((post) => (
          <PostsItem key={post.slug} post={post} />
        ))}
      </ul>
      {showPagination && (
        <Pagination currentPage={currentPage} numPages={numPages} />
      )}
    </section>
  );
};

export default AllPosts;

import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import classes from './pagination.module.scss';

const Pagination = (props) => {
  const { currentPage, numPages } = props;

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    setIsFirst(currentPage === 1);
    setIsLast(currentPage === numPages);
    setPrevPage(
      currentPage - 1 === 1 ? '/posts' : `/posts/p/${currentPage - 1}`,
    );
    setNextPage(`/posts/p/${currentPage + 1}`);
  }, [currentPage, numPages]);

  return (
    <div className={classes.pagination}>
      {!isFirst ? (
        <Link href={prevPage} rel="prev">
          ← 較新文章
        </Link>
      ) : (
        <span>← 較新文章</span>
      )}
      {!isLast ? (
        <Link href={nextPage} rel="next">
          較舊文章 →
        </Link>
      ) : (
        <span>較舊文章 →</span>
      )}
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
};
Pagination.defaultProps = {
  currentPage: 0,
  numPages: 0,
};

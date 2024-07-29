import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import { slugify } from '@/utils/helper';

import classes from './tags.module.scss';

const Tags = ({ tags }) => {
  return (
    <div className={classes.tags}>
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${slugify(tag)}`} className={classes.tag}>
          {tag}
        </Link>
      ))}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
};
Tags.defaultProps = {
  tags: [],
};

export default Tags;

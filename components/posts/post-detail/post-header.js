import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './post-header.module.scss';

const PostHeader = (props) => {
  const { title, image } = props;

  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      {image && <Image src={image} alt={title} width={200} height={120} />}
    </header>
  );
};

export default PostHeader;

PostHeader.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};
PostHeader.defaultProps = {
  title: '',
  image: '',
};

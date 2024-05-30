import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import { slugify } from '@/utils/helper';

import classes from './posts-item.module.scss';

const PostsItem = (props) => {
  const { title, image, excerpt, date, slug, tags } = props.post;
  // April 14, 2023
  // const formattedDate = new Date(date).toLocaleDateString('en-US', {
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric',
  // });
  // 2023年4月14日
  const formattedDate = new Date(date).toLocaleDateString('zh-TW', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/blog-posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      {tags && (
        <div className={classes.tags}>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slugify(tag)}`}
              className={classes.tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <div className={classes.content}>
        <Link href={linkPath}>
          <h3>{title}</h3>
          {image && (
            <div className={classes.image}>
              <Image src={imagePath} alt={title} fill sizes="100vw" />
            </div>
          )}
          <p>{excerpt}</p>
          <time>📅 {formattedDate}</time>
        </Link>
      </div>
    </li>
  );
};

export default PostsItem;

PostsItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    excerpt: PropTypes.string,
    date: PropTypes.string,
    slug: PropTypes.string,
    tags: PropTypes.array,
  }),
};
PostsItem.defaultProps = {
  post: {
    title: '',
    image: '',
    excerpt: '',
    date: '',
    slug: '',
    tags: [],
  },
};

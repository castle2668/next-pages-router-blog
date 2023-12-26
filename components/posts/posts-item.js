import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import classes from './posts-item.module.scss';

const PostsItem = (props) => {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imagePath = `/images/blog-posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.row}>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PostsItem;

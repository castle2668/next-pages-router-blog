import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './all-tags.module.scss';

const AllTags = (props) => {
  const { tags } = props;

  return (
    <section className={classes.tags}>
      <h2>Tags</h2>
      <p>目前總共有 {tags.length} 個標籤 (`・ω・´)</p>
      <ul>
        {tags.map((tag) => (
          <li key={tag.slug}>
            <Link href={`/tags/${tag.slug}`}>
              {tag.name} ({tag.count})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AllTags;

AllTags.propTypes = {
  tags: PropTypes.array,
};
AllTags.defaultProps = {
  tags: [],
};

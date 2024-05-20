import Link from 'next/link';
import React from 'react';

import classes from './logo.module.css';

const Logo = () => {
  return (
    <Link href="/" className={classes.logo}>
      <h1>大貓的第一個家</h1>
    </Link>
  );
};

export default Logo;

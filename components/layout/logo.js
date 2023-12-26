import Link from 'next/link';
import React from 'react';

import classes from './logo.module.css';

const Logo = () => {
  return (
    <Link href="/" className={classes.logo}>
      <h1>{`Yunghsiang's Blog`}</h1>
    </Link>
  );
};

export default Logo;

import React from 'react';

import classes from './header.module.css';
import Hero from './hero';
import Logo from './logo';
import Navigation from './navigation';

const Header = () => {
  return (
    <header className={classes.header}>
      <Logo />
      <Hero />
      <Navigation />
    </header>
  );
};

export default Header;

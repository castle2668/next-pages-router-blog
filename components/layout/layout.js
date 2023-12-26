import React from 'react';

import Footer from './footer';
import Header from './header';
import classes from './layout.module.css';

const Layout = (props) => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

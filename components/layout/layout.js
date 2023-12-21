import React from 'react';

import MainNavigation from './main-navigation';

const Layout = (props) => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
      <div id="notifications" />
    </>
  );
};

export default Layout;

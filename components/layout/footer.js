import React from 'react';

import classes from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.copyright}>
        Copyright © 2019-2024{' '}
        <a href="https://github.com/huangyonshan">Yonshan Huang</a>. All rights
        reserved.
        <br />
        All images and other content related to MapleStory are owned by Nexon
        Corporation.
      </div>
    </footer>
  );
};

export default Footer;

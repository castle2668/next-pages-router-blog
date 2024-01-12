import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.avatar}>
        <Image
          src="/images/site/yunghsiang.jpg"
          alt="An image showing Yunghsiang"
          width={100}
          height={100}
        />
      </div>
      <h1>{`Hi, I'm Yunghsiang`}</h1>
      <p>
        I blog about web development - especially frontend frameworks like React
        or Next.
        <br />
        Passion Comes From Mastery.
      </p>
      <div className={classes.social}>
        <Link href="https://www.linkedin.com/in/yunghsiang" target="_blank">
          <Image
            src="/images/site/icon-linkedin.svg"
            alt="Yunghsiang LinkedIn"
            width={30}
            height={30}
          />
        </Link>
        <Link href="https://github.com/yunghsianghuang" target="_blank">
          <Image
            src="/images/site/icon-github.svg"
            alt="Yunghsiang GitHub"
            width={30}
            height={30}
          />
        </Link>
      </div>
    </section>
  );
}

export default Hero;

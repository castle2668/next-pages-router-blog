import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.avatar}>
        <Image
          src="/images/site/avatar.jpeg"
          alt="An image showing avatar"
          width={100}
          height={100}
        />
      </div>
      <h1>{`Hi, I'm Sean`}</h1>
      <p>
        這裡記錄我學習網站開發的筆記
        <br />
        歡迎交流 {`(ゝ∀･)b`}
      </p>
      <div className={classes.social}>
        <Link href="https://www.linkedin.com/in/sean-huang-tw" target="_blank">
          <Image
            src="/images/site/icon-linkedin.svg"
            alt="LinkedIn"
            width={30}
            height={30}
          />
        </Link>
        <Link href="https://github.com/castle2668" target="_blank">
          <Image
            src="/images/site/icon-github.svg"
            alt="GitHub"
            width={30}
            height={30}
          />
        </Link>
      </div>
    </section>
  );
}

export default Hero;

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import classes from './navigation.module.scss';

const navigationList = [
  { name: '首頁', path: '/' },
  { name: '歸檔', path: '/archives' },
  { name: '標籤列表', path: '/tags' },
  { name: '關於我', path: '/about' },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={classes.navigation}>
      <ul>
        {navigationList.map((item) => {
          return (
            <li
              key={item.path}
              className={pathname === item.path ? classes.active : null}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;

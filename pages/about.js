import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import React from 'react';

import ContactForm from '@/components/contact/contact-form';

const AboutPage = () => {
  return (
    <>
      <NextSeo
        title="About | 大貓的第一個家"
        canonical="https://www.damao.dev/about"
        openGraph={{
          url: 'https://www.damao.dev/about',
          title: 'About | 大貓的第一個家',
        }}
      />
      <h2>🍔 About Me | 關於我</h2>
      <p>Frontend Engineer / Taiwanese / Passion Comes From Mastery</p>
      <ul>
        <li>暱稱：大貓 (Damao)</li>
        <li>
          描述：每天都進步 1%，一年後你會進步 37 倍；每天都退步
          1%，一年後你會弱化到趨近於 0！
        </li>
        <li>狀態：正在執行四轉任務中...</li>
        <li>專業：前端開發與資訊管理</li>
        <li>信箱：castle2668@gmail.com</li>
      </ul>
      <h2>🏡 About Blog | 關於部落格</h2>
      <p>
        本部落格名稱改編自史萊姆的第一個家，不僅是作者的童年回憶，該站點從創立至今都在持續更新，希望以此勉勵自己也要不斷學習，持續地精進自己。
      </p>
      <p>
        這個部落格主要是用來紀錄我學習與開發的筆記，同時檢視自己對技能的理解。
        <br />
        歡迎大家交流 (\*´∀`)~♥
      </p>
      <ul>
        <li>{`網站名稱：大貓的第一個家 (Damao's first homepage)`}</li>
        <li>網站類型：部落格</li>
        <li>網站描述：學習筆記與開發心得</li>
        <li>網站網址：https://www.damao.dev</li>
        <li>網站狀態：持續更新中...</li>
      </ul>
      <h2>📎 License | 授權</h2>
      <p>
        本部落格是採用創用 CC 姓名標示 - 非商業性 - 相同方式分享 4.0
        國際授權條款授權。
      </p>
      <Link
        href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        title="CC BY-NC-SA 4.0"
      >
        <Image
          src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
          alt="CC BY-NC-SA 4.0"
          width={88}
          height={31}
        />
      </Link>
      <h2>📮 Contact Me | 聯絡我</h2>
      <ContactForm />
    </>
  );
};

export default AboutPage;

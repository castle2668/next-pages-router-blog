import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-Hant-TW">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="notifications" />
      </body>
    </Html>
  );
}

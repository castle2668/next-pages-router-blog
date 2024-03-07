---
title: 'Optimizing Images with the "Next Image" Component & Feature'
date: '2023-11-15'
excerpt: 'Next.js 的一大特點就是已經即成了許多便利的功能，包含簡便的路由配置、圖片優化、效能優化、打包優化等等，今天來看看圖片優化是怎麼個做法。'
tags: ['Next', 'Pages Router']
---

在 Next.js 中，`next/image` 提供了圖片載入優化的方式，有助於提升網站的性能和使用者體驗。

在我們還沒使用 Next Image 之前，網站上的圖片都是原始的尺寸與解析度，也不會去使用瀏覽器提供的優化格式，像是 Chrome 可使用 webp，導致圖片檔案過大，這在正式生產環境可不是一件好事。

使用 Next Image 時需撰寫 `width` 與 `height` 這兩個屬性，這影響的並不是圖片呈現的寬度，而是這張圖片被 Fetch 下來的尺寸大小。

畫面上的圖片寬高，你依然可以透過 CSS 去調整。

```jsx
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/profile.png"
      width={250}
      height={250}
      alt="Picture of the author"
    />
  );
}
```

使用後，可以在 Network 裡面查看，可以發現圖片大小減少許多，並且使用 Chrome 的話會是 webp 這個圖片優化的檔案格式。

除此之外，Next Image 預設有 Lazy Loading 的功能，也就是你還沒瀏覽到時，瀏覽器就不會去加載該張圖片。

你可以試著把畫面由手機版拉寬成桌機版，會發現 Network 中多 Request 了一張大圖，這就是因為當畫面變寬時，Next Image 才懶加載大圖，而畫面小的時候這一張圖就不會被載入。

# 大貓的第一個家

## 使用技術

- 全站以 Next.js 14 + CSS Modules 建構
- 留言板使用 MongoDB 作為存儲資料庫
- 文章使用 `react-markdown` + `react-syntax-highlighter` + `gray-matter` 呈現
- 透過 Vercel 部署
- Meta Tags 與 Open Graph 使用 `next-seo` 協助生成

## 開發規範

- 透過 VSCode Format Code Action 組合使用 ESLint + Prettier
- ESLint 配置：`eslint` + `eslint-config-next` + `eslint-plugin-simple-import-sort`

## 願望清單

- [ ] 文章 TOC
- [ ] 《關於我》頁面補充專案資訊
- [ ] 全文搜尋功能
- [ ] PWA 設定
- [ ] 多國語系

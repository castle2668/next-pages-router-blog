---
title: 'Code Reuse: React Higher-Order Components'
excerpt: '本文介紹 React Higher-Order Components 的概念。'
tags: ['React']
date: '2022-02-14'
---

## Higher-Order Components

Higher-Order Components (HOC) 是一個函式，帶入一個元件作為參數，並回傳一個加強版的元件。

使用 HOC 的目的是將共用的邏輯放在 HOC 中，變動的部分由帶入的元件的 Props 和 State 傳入。

做到元件的重用，不用撰寫相似程式碼。

例如：`connect()` 就是一個 HOC。

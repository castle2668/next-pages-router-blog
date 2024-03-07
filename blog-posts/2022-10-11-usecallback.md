---
title: 'Debouncing with useCallback Hook'
excerpt: '本文介紹 React 當中 useCallback 這個 Hook 的使用概念，並且結合 Lodash 實作 Debouncing Search 的功能幫助理解 useCallback 的作用。'
tags: ['React', 'Lodash']
date: '2022-10-11'
---

## ⚓ useCallback Hook

> Avoid unnecessary re-rendering "when Props is Object type"

useCallback 允許我們儲存跨組件執行的「函式」，它會把函式儲存在 React 內存記憶體，讓使用時的物件位址都是指向同一個地方。

```jsx
// 回傳一個 memoized 的 callback
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

這時候使用像是 React.memo 時，就能夠知道傳入的函式是相同的物件。儘管 Props 的是 Object，仍可以在父元件重新渲染時，不會重新分配記憶體位址，減少不必要的重新渲染。

### Dependencies

useCallback 與 useEffect 一樣都要傳入 dependency array，要放入我們在函式中使用到的（相關於組件的）任何東西。

```jsx
// 這裡用到 setState 但是不用放入 dependency，因為 React 保證 setState 不會變化
const toggleParagraphHandler = useCallback(() => {
  setShowParagraph((prevShowParagraph) => !prevShowParagraph);
}, []);
```

如果函式有使用到一些變數，因為有 Closure 關住原本的狀態，所以就算外部更改了變數，此時 useCallback 包住的函式的變數值，仍然會是傳入時的值。

因此，如果希望根據變數改變，而重新生成函式的話，我們就得把那個變數加入 Dependency。

例如：我們希望 `allowToggle` 更改時，就重新生成 `toggleParagraphHandler` Function。

```jsx
const toggleParagraphHandler = useCallback(() => {
  if (allowToggle) {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }
}, [allowToggle]);
```

## Example: Lodash Debounce with React Hooks

useCallback 常見的其中一個使用情境，就是在實作 Throttle 或 Debounce 功能的時候。

搜尋時，我們透過 Lodash `_.debounce()` 得到一個回傳的 Debounced 函式，並且函式使用 `window.setTimeout` 處理的 Timer 每次都不一樣，所以可以達到等待輸入的效果。

換句話說，每一次回傳的 Debounced 函式也會是全新的，因此我們必須想辦法記憶這個函式，避免 React 元件重新渲染。

### 透過 useRef 避免重新渲染

我們可以透過 useRef 來記錄資料，因為透過 useRef 記錄的資料即使改變也不會造成重新渲染，反之 useState 則會造成 Re-render。

範例：使用 useRef 儲存資料，並使用 `.current` 屬性取得最新的 Debounced Function。

```jsx
const debouncedSearch = useRef(
  debounce(async (params) => {
    await doSearch(params);
  }, 1000),
  [],
).current;
```

### A better semantically solution: useCallback

除了上面 useRef 的實作方式之外，使用 useCallback 也可以完成一樣的效果，並且會讓程式碼更具有語意化。

```jsx
const debouncedSearch = useCallback(
  debounce(async (params) => {
    await doSearch(params);
  }, 1000),
  [],
);
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- React useCallback Hook
- Lodash Debounce with React Hooks

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
- [useCallback - React 官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecallback)

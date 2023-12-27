---
title: 'Code Reuse: React Custom Hooks'
excerpt: '本文介紹為何要使用 Custom Hooks 以及其撰寫的方式。'
tags: ['React']
date: '2022-02-04'
---

## What is Custom Hook

- Custom Hooks：可以使用 React Hooks 與 State 的函式
- 使用時機：當不同元件裡有著一定程度共通的邏輯時，我們會想要複用它，而在元件中只撰寫不同的部分
- 特性：Custom Hook 每次使用時，各自內部的 state 與 effect 都是完全獨立的

## Creating a Custom Hook Function

> Custom Hooks 並不是 Functional Components，它是一個函式，只是在做法上有點類似。

首先，我們通常都會在 `src` 底下建立一個 `hooks` 資料夾，用來存放之後建立的 Custom Hooks。而 Custom Hooks 的檔案名稱也是個人喜好，我自己喜歡用 `use-xxx.js` 作為命名規則。

範例：新增 `use-counter.js` 檔案，建立一個函式 `useCounter`。

> 注意！此時的 `useXXX` 則是必須遵守的名稱規範，這是為了能讓 React 辨別這是 Custom Hooks。

```jsx
import { useEffect, useState } from 'react';

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return counter;
};

export default useCounter;
```

如同內建的 React Hooks，這個 Custom Hook 也會 `return` 東西，不過可以是「任何」型別。

## 共用的是邏輯，不會共用狀態

在 Custom Hooks 中，使用 `useState` 與 `useEffect` 會與使用它的元件做連結。

如果在「多個組件」使用同一個 Custom Hook，每個組件都會產生一套自己的 Custom Hook，也就是裡面使用的 State 或 Effect 等資料都是「不會共用」的。

## Using Custom Hooks

現在我們在其他元件中使用 `useCounter` 來取得回傳值，到這裡，我們已經成功做到邏輯拆分囉。

```jsx
const ForwardCounter = () => {
  const counter = useCounter(); // 這個 counter 是 Custom Hook 回傳的

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
```

接下來，我們再針對不同的邏輯去做改變，像是透過「參數」來指定不同的邏輯。

例如：透過 `forwards` 參數，給予 Custom Hook `false` 表示遞減，預設的 `true` 則為遞增。

```jsx
const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // 根據參數的值判斷要執行的動作
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]); // 記得把參數放入 Dependencies array

  return counter;
};
```

現在我們來使用參數吧，選擇傳入 `false` 表示要執行遞減。

```jsx
const BackwardCounter = () => {
  const counter = useCounter(false);

  return <Card>{counter}</Card>;
};
```

## 使用 Custom Hooks 的注意事項

### 1. 注意那些傳參考的類別

如果 Custom Hook 回傳的內容有函式（或物件），在使用 `useEffect` 時「不能」將它加入 dependencies array 以偵測 Function 的改變。

為什麼？照理來說不是要加入嗎？

是沒錯，可是加入後會造成 Infinite Loop！因為每次新生成的函式物件雖然內容看似一樣，但其實傳的參考都不同，這就會造成 `useEffect` 一直重跑。

- 解決方法：給予可能變動的函式（或物件）都套上 `useCallback`（或 `useMemo`），這樣就能確保是同一個物件了

### 2. 避免在使用 Custom Hook 時傳入參數，將外部依賴改為函式參數

除了上述說的使用 useCallback 或 useMemo 以外，其實我們還有另一個辦法，那就是將放在 Custom Hook 身上的 Dependencies 改放到內容裡面。

內容就是指 Custom Hook 中用到這些變數的地方，我們直接讓 Custom Hook 裡面的 Function 使用參數就好，這時候就不必對 Custom Hook 傳參數，Custom Hook 也就不用新增 Dependencies 了。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Custom Hooks

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

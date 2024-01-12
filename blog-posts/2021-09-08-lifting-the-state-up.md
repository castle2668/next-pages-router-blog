---
title: 'Lifting The State Up in React'
excerpt: 'Props 的用途是讓父子元件之間傳遞狀態，使子元件也能使用到父元件定義的狀態。而子元件的狀態也能透過 Lifting State 的方式提升給父元件使用。'
tags: ['React']
date: '2021-09-08'
---

> 觀念近似 Vue 的 Emit (From Child to Parent)

當 Parent component 需要取得由 Child component 生成的 data 時，我們可以使用 Lifting The State Up 的技巧。

## STEP 1：父元件傳遞一個函式給子元件

在 Parent component 建立一個函式，這個函式 (`onXXX`) 會作為 props 傳遞給 Child。

```jsx
// ParentComponent

const xxxHandler = () => {
  // do something...
};

// Return JSX
<ChildComponent onXXX={xxxHandler} />;
```

## STEP 2：子元件存取 Props 調用函式

在 Child 裡面執行 `props.onXxx` 函式，就等同執行了 Parent 的 `xxxHandler` 函式，因為函式傳遞的是 **Pointer (By Reference)**。

```jsx
// ChildComponent

props.onXxx();
```

## STEP 3：從子元件傳入參數，達到 State 提升

從 Child 放入參數，透過呼叫函式來傳遞給 Parent。

```jsx
// ChildComponent

const childData = {
  title: 'Child Title',
  data: new Date(),
};

props.onXxx(childData);
```

這時候 Parent 就可以從參數獲得 Child 的資料了，此時就完成了提升 State 的動作了。

```jsx
// ParentComponent

const xxxHandler = (enteredChildData) => {
  // do something...
  const childData = { ...enteredChildData };
  console.log(childData);
};

// Return JSX
<ChildComponent onXXX={xxxHandler} />;
```

## Recap

- Lifting The State Up

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

---
title: 'Working with useRef & React.forwardRef'
excerpt: '本文介紹 useRef 與 React.forwardRef 的觀念。'
tags: ['React']
date: '2021-10-01'
---

## What is Ref

Ref 就是 Reference 的意思，它是一個「唯讀屬性」，只能讀不能寫。

因此，如果我們只是想要讀取一個值，其實可以先使用 `ref` 就好，不需要使用到 State。

## ⚓ useRef Hook

> ref 主要是用來訪問 DOM 的方式

如果只是要取得送出的值，不需要操作、修改值的話，我們其實不必使用到 `useState` 與 `onChange` 來監控每一次輸入的變化，我們可以使用 `useRef` 來處理這個情況。

`useRef` 會回傳一個 Object，裡面的 `current` 屬性為初始傳入的參數（通常不寫或者寫 `null`），存取這個 `current` 就會拿到你用 `ref` 設定的相應的 DOM 節點。

```jsx
// 新增 useRef 加到 HTML <Input> 上面
const nameInputRef = useRef();
<input id="username" type="text" ref={nameInputRef} />;

// useRef.current 指向 <input> element
console.log(nameInputRef.current); // <input id="username" type="text">
```

特別注意：`useRef.current.value` 取得的值會是 String 型別，即使 Input 的 `type` 設定為 `number` 也一樣。

```jsx
console.log(nameInputRef.current.value); // "1"
console.log(+amountInputRef.current.value); // Convert a numbered "String" to a "Number"
```

如果要透過 `ref` 操作 DOM，基本上只建議進行一些簡單的動作，因為 DOM 的部分又稱為 **Uncontrolled Component**，也就是它並不受到 React 控制的意思。

話雖如此，但是以下這種清空輸入欄的動作其實還是可以接受的，因為我們並沒有透過 `useRef` 來新增 DOM，如果只是單純更改輸入欄位的值，其實影響不大，還在可接受的範圍內。

```jsx
// Manipulating the DOM
nameInputRef.current.value = '';
```

## React.forwardRef

如果不是原生的 HTML 標籤，而是自己寫的元件的話，我們沒辦法直接使用 `ref`。

```jsx
// 自己做的 <Input> 元件，沒辦法直接使用 ref

<Input ref={xxxRef} />
```

我們必須要透過 `forwardRef` 把元件包裝起來，變成 `<forwardInput>` 來把 `<Input>` 往前傳遞。

```jsx
const forwardInput = React.forwardRef(Input);
```

當我們自製的元件使用 `forwardRef` 包裝後，這個 `<Input>` 元件就能夠取用 `ref` 這個參數了，現在我們把 `ref` 當成 props 傳遞給裡面的 HTML `<input>` 使用。

> 注意，此時在父元件當中，我們要使用的仍然是 `<Input>`，而不是 `<forwardInput>` 喔！

```jsx
const Input = (props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
};

const forwardInput = React.forwardRef(Input);

export default forwardInput;
```

> 實際使用範例可參考 [React Hook useRef and forwarding refs with forwardRef](https://youtu.be/ScT4ElKd6eo) 這部影片。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- useRef Hook
- React.forwardRef

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

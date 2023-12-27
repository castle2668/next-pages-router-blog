---
title: 'React 狀態管理工具 - useReducer Hook'
excerpt: '本文介紹 useReducer 這個更強大的狀態管理 Hook。'
tags: ['React']
date: '2021-10-24'
---

## ⚓ useReducer Hook

> 💡 If you have an **object** as a state or a more **complex state updates**, useReducer might be interesting.

更強大的狀態管理，但使用起來也更為複雜，適合用於資料有較複雜的處理時，但一般而言，多數情況下使用 useState 就足夠哩。

如果有學過 Vuex，其實 useReducer 有著類似 Vuex 的觀念，它跟 Redux 更是 87% 像，都擁有 Action、Reducer、Store 這幾個傳遞資料的觀念。

不過 useReducer 沒辦法像 Vuex 或是 Redux 一樣建立起全局的資料狀態，它建立的仍然是當前 Component 的 State 而已，但是我們還是可以透過搭配 useContext 做到類似輕量 Redux 的功能喔。

### **使用方式** INIT (≈ State in Vuex)

```jsx
const [state, dispatchFn] = useReducer(reducerFn, initState, initFn);
```

- state: state snapshot
- **dispatchFn**: a function to update the state snapshot
- **reducerFn**: get the latest state snapshot automatically, and return the new updated state
- initState
- initFn

### Reducer Function (≈ Mutations in Vuex)

Reducer Function (reducerFn) 可以直接用匿名箭頭函式，或是額外寫一個具名函式。如果 Reducer Function 沒有用到 Component 裡的 State，是可以把函式放到 Component 外面的。

這個 Reducer Function 會接收兩個參數，分別是 `state` 與 `action`，並且最後要 Return 一個最新的 State。

```jsx
// State
const defaultEmailState = {
  value: '',
  isValid: false,
};
const emailReducer = (state, action) => {
  return defaultEmailState;
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    defaultEmailState
  );
};
```

### Dispatch Function (≈ dispatch Actions in Vuex)

在元件中使用 Dispatch Function，後面帶入的參數會一起傳遞給 useReducer 的 `action` 參數。

範例中 `emailReducer` 可取得由 `dispatchEmail` 所傳遞的 `action.type` 與 `action.val`。

```jsx
//                     type       , payload
dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
```

通常我們會用「物件」的形式來定義 `action`，因為這樣可以順便聲明這個 `action` 的 `type`。

接下來我們就可以來更新 state 了！

```jsx
// React guarantees that this state is absolutely the last state snapshot
const emailReducer = (state, action) => {
  // 使用者輸入觸發 Dispatch Function
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  // 輸入框失去焦點觸發 Dispatch Function
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};
```

## Why useReducer

到這裡，我們已經把原本在元件中的邏輯抽離到 reducer 裡面了。

這麼做的好處在於，一旦元件裡的 State 邏輯複雜時，我們不會在閱讀元件程式碼的同時，還被各種 setState 搞亂自己思緒。

除此之外，如果我們要把 Callback 作為 Props 傳給子元件，通常都會加上 useCallback 記憶函式，避免重新渲染。  
而使用 useReducer 後，因為 dispatch 不會因爲 Re-rendering 而被重新分配記憶體位置，所以它被當作 Props 傳遞時，不加上 useMemo 也沒問題。

## 無法完全取代 Redux

雖然 useReducer 可以搭配 useContext 做到類似 Redux 的狀態管理機制，但是他們仍然無法取代 Redux。

因為 Redux 能透過 Action-Creator-Thunk 這種 Middleware 來處理資料串接，以及 Side Effect 的處理，這個部分即使是 useReducer + useContext 也仍然沒辦法做到的。

另外，使用 useContext 最大的硬傷就是 Re-rendering 的問題，一旦 Provider 傳遞的值改變，所有用到的元件都會重新被渲染。

所以基於以上兩點，他們無法完全取代 Redux。不過如果只是想要尋求 Props Drilling 的解決方案，那麼 useReducer 加上 useContext 就會是一個很適合的做法哩。

## Recap

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- useReducer Hook

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

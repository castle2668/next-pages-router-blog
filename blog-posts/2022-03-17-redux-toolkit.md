---
title: '使用 Redux Toolkit 更有效率地撰寫 Redux'
excerpt: '本文介紹 Redux Toolkit 的基本使用方式，因為我是從 Vue 轉 React 的開發者，第一眼看到 Redux Toolkit 真的眼睛為之一亮！裡面使用到的觀念與 Vuex 相仿，非常好理解，撰寫的結構也相當有條理喔。'
tags: ['React', 'Redux', 'Redux Toolkit']
date: '2022-03-17'
---

## Installation

```bash
npm install @reduxjs/toolkit
npm install react-redux
```

## 基本用法

1. Create a Redux State Slice by **createSlice**
2. Create a Redux Store by **configureStore**
3. Use Redux State and Actions in React Components

第一步先建立 Slice (counterSlice)。

```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: 'counter', // 可任意命名
  initialState: initialState, // 初始值
  reducers: {
    // 現在不用帶 type 了，所以這邊不會用到 action
    increment(state) {
      state.counter++; // Redux Toolkit 會自動把它變成 immutable 的方式
    },
    decrement(state) {
      state.counter--;
    },
    // 加上 action 因為需要 payload
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// 導出 counterSlice 的 actions 物件到元件中做使用
export const counterActions = counterSlice.actions;
```

建立好 Slice 之後，建立 Store 並且配置 Reducer。

有別於以往使用 createStore 建立 store，這次我們要改用 Redux Toolkit 裡面的 `configureStore` 函式來建立 store。

因為 Redux 需要一個主要的 Reducer Function，所以一定要配置一個 key 叫做 `reducer`，主要用來控制 Global State。接著，把我們想要全域使用的 Reducer 作為 `value` 餵給 `reducer`。

```jsx
// Create Redux store
// const store = createStore(counterSlice.reducer);

// 取代原本的 createStore，配置 Reducer
const store = configureStore({
  reducer: counterSlice.reducer,
});
```

在一些大型專案，我們可能會切分出多個 Slice，這時候我們就要配置多個 Reducer。

這麼做就像是在 Create a map of reducer，然而 `configureStore` 其實已經默默地在背後幫我們把這些 Reducers 全部 merge 為一個 Main Reducer 了。

```jsx
// Create a map of reducer (Add Slice Reducers to the Store)
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

export default store;
```

以上都完成後，現在如果使用 `counterSlice.actions.toggleCounter()`，它會回傳一個自動生成的 action 物件，是類似 `{type: 'some auto-generated unique identifier'}` 這樣格式的一個 action。

這也是為什麼我們在使用 `dispatch` 時，後方的 Actions 有帶 () 會直接執行，因為就是要直接執行取得自動生成的 action 物件。

> P.S. 我們在最後 `export` 時可以直接導出整個 actions 物件，像是命名為 `counterActions` 並且在元件中做使用。

使用範例：在元件中使用 `dispatch(counterActions.increment())` 也就等於使用 `dispatch({type: 'UNIQUE_ID'})` 的效果，如果還需要 Payload 就再加上參數即可。

```jsx
import { counterActions } from '../store';

const Counter = () => {
  // ...omit
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    // payload
    dispatch(counterActions.increase(10)); // {type: 'UNIQUE_ID', payload: 10}
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };
  // ...omit
};
```

## 處理多種 State

```jsx
const initialCounterState = {...};
const counterSlice = createSlice({...});

const initialAuthState = {...};
const authSlice = createSlice({...});

const store = configureStore({
  // reducer map
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

// Expose the actions
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
```

在元件中讀取 state 時，要去指定 reducer map 中的 identifier。

```jsx
// state.counter => state.counter.counter
const counter = useSelector((state) => state.counter.counter);
const showCounter = useSelector((state) => state.counter.showCounter);
```

## 檔案拆分

不同的 State 拆成不同的檔案，像是 counter 就放在 counter.js，auth 放在 auth.js，最後再 import 到 index.js 一起導出。

src/store/counter.js

```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = {...};
const counterSlice = createSlice({...});

export const counterActions = counterSlice.actions; // Expose the actions
export default counterSlice.reducer;
```

For dispatch, expose the actions

> src/store/auth.js

```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {...};
const authSlice = createSlice({...});

export const authActions = authSlice.actions; // Expose the actions (for dispatch)
export default authSlice.reducer;
```

KEY (`counter`, `auth`) for useSelector (`state.KEY.stateName`)

> src/store/index.js

```jsx
import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
  // KEY for useSelector (state.KEY.stateName)
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
```

在元件使用 Actions 物件時也要注意 import 的路徑。

```jsx
import { counterActions } from '../store/counter';
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Redux Toolkit

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

---
title: "Redux Toolkit with Action Creator Thunk"
excerpt: "本文介紹 Redux Toolkit 當中的 Action Creator Thunk 設計，透過 Thunk 幫助我們更好地處理非同步邏輯。"
tags: ["React", "Redux", "Redux Toolkit"]
date: "2022-03-18"
---

## Asynchronous code 在 Redux 中的問題

在 Reducer 中我們只處理「同步」行為，因為在 Reducer 執行 Call API 這種非同步的動作會造成 Side Effect。我們會在 Reducer 裡面更改 (mutate) 狀態，而且我們不應該在 Reducer 以外的地方 mutate 任何的 state。

那麼究竟該怎麼處理非同步行為呢？

我們可以在「元件」中透過 `useEffect()` 處理非同步行為，或是透過 Redux 的「Action creator」來處理它。

## 程式碼邏輯應該放在哪裡

- 同步，沒有 Side Effect 的程式碼，例如：資料轉換
  - **建議**在 Reducers 中更改
  - **避免**在 Action Creators 或 Components 中更改
- 非同步，或者有 Side Effects 的程式碼，例如：呼叫 API
  - **建議**在 Action Creators 或 Components 中執行
  - **千萬不要用 Reducers**

## 透過 Action Creator Thunk 處理非同步行為

> 很類似 Vuex 裡面的 `actions` 在處理的事情。

根據上面所說，非同步的 Code 可以放在 Component 或是 Redux Thunks 當中。

什麼是 Thunk？  
Thunk 其實只是一個函式，目的是將某一個動作「延後」到其他事情完成後再執行。

那麼如果一個 Action Creator 是 Thunk，那麼這個 Action Creator 不會回傳 Action 物件，而是會回傳一個函式。  
而這個函式才會返回 Action 物件。

例如：想要在 Dispatch 之前先完成一些事情，像是設定 Loading 等等。

```jsx
// Thunk
export const sendCartData = (cart) => {
  // Redux Toolkit give us "dispatch" automatically
  // and Redux Toolkit will execute this function automatically
  return async (dispatch) => {
    // We wanna do something before dispatching...
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-14f5a-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
```

這個 `sendCartData` 就是我們自定義的 Action Creator Function (Thunk)，它可以幫助我們把組件裡的邏輯抽離，改為放在 Redux 裡面，讓組件更精簡。

這個邏輯可以放在元件中，也可以抽離成 Thunk 放在 Redux 中。  
由於後者的概念與 Vuex 比較接近，因此在個人經驗上，我會對 Thunk 的方式感覺到比較熟悉。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Action Creator Thunk

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

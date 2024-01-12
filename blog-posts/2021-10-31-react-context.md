---
title: '使用 React Context 處理全域狀態'
excerpt: '本文介紹 React Context 的基本用法，包含 createContext、Provider、Consumer、useContext 等觀念。'
tags: ['React']
date: '2021-10-31'
---

## React Context (Context API)

當 Props 從 Parent 傳到 Child，再往下傳給下一個 Child 時，這樣一層一層的傳遞鏈在大型專案上會相當複雜，此時就可以使用 Context API 來處理。

例如：是否登入的狀態需要使用在許多場景，用來驗證用戶是否登入；亦或是購物車資料需要顯示於不同頁面。

如果我們可以省略中間的這些轉發的過程，直接從父組件傳遞 Props 給真正需要資料的子組件的話，不啻是一個方便且優雅的方式嗎？

因此，我們有了 React Context。

### 前置 1：React.createContext

在 src 下建立 store 資料夾，並新增一個 Context，它會用來管理與登入授權相關的狀態。

這個 AuthContext 本身並不是一個組件，它是用來包著組件的一個物件。

```jsx
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
```

如果在某個子元件會用到 Context，那就是用 AuthContext 包住那一個子元件。

如果整個 App 到處都會用到，那也可以選擇用 AuthContext 包住整個 App 的內容，如同接下來的範例。

### 前置 2：Context.Provider

在包的時候，我們會加上 `.Provider` 將這個 React Context 物件變成一個組件，這樣就能提供 Store 的資料給內層的子元件使用了。

```jsx
return (
  <AuthContext.Provider>
    <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </AuthContext.Provider>
);
```

如上所示，此時 MainHeader、Login、Home 等元件都可以訪問到 AuthContext 囉！

### 用法 1：使用 Context.Consumer

React.Context.Consumer 組件本身自帶一個 `{child}`，並且是一個函式 `(ctx) ⇒ {}` 的形式。

參數 `ctx` 就是指向剛才 Store 裡面的資料，像是 `{ isLoggedIn: false }`，而函式的最後會 return 要存取這個資料的 JSX 程式碼。

```jsx
import React from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {props.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {props.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
```

> 此時，如果網頁 Crash 了，那麼有可能是你同時使用了 Provider 與 Consumer，以下提供解決方式

#### 解法一：只使用 Consumer 存取默認值就好

如果只想使用 Consumer 來存取**默認值**，也就是 `{ isLoggedIn: false }`，那麼使用 Consumer 時就不要同時用 Provider。

把剛才包覆的 Provider 先拿掉，這樣 Consumer 就能正常提供默認值。

```jsx
return (
  <React.Fragment>
    <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </React.Fragment>
);
```

#### 解法二：同時使用 Consumer 與 Provider 時，Provider 要搭配 value

另一個方法是我們同時使用兩者，但是 Provider 要加上 `value`。

```jsx
return (
  <AuthContext.Provider
    value={{
      isLoggedIn: false,
    }}
  >
    <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </AuthContext.Provider>
);
```

除此之外，Provider 的值還可以做更改，用來設定載入時的初始值。

Example: Listen state (`isLoggedIn`) changes, and pass down to all components we consume this Context

```jsx
return (
  <AuthContext.Provider
    value={{
      // -------- listen useState changes
      isLoggedIn: isLoggedIn,
    }}
  >
    <MainHeader onLogout={logoutHandler} />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </AuthContext.Provider>
);
```

### 👍 用法 2: ⚓ useContext Hook

除了透過 Context.Consumer 來存取 Store 之外，我們也可以用 useContext 來取用 AuthContext。

> [useContext - React 官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecontext)

```jsx
const value = useContext(MyContext);
```

`useContext` 會接收一個 context object（`React.createContext` 的回傳值）並回傳該 context 目前的值。Context 目前的值是取決於由上層 component 距離最近的 `<MyContext.Provider>` 的 `value` prop。

> 要傳 String, Object, Function 都可以！

```jsx
// Provider

return (
  <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      // Pass logoutHandler down to all components we consume this Context
      onLogout: logoutHandler,
    }}
  >
    <MainHeader />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </AuthContext.Provider>
);
```

下面就是 `useContext` 的寫法，可以發現寫法真的簡潔優雅很多，大推 👍

```jsx
// useContext

import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
```

```jsx
// Use Navigation Component

const Navigation = () => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {/* omit above code */}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

### Props vs. Context

這樣看起來，有些時候使用 Props 還是 Context 好像都能達到傳遞的效果，那它們兩個的使用時機該怎麼決定呢？

其實在一般情況下，我們都使用 Props 居多，這樣才能讓組件具有「複用性」。  
因為如果使用 Context，那麼該組件就會永遠是那一個功能，便會失去它的複用性。

所以通常只有當我們要轉發的資料，需要越過很多元件時，或是該元件有一個明確、具體的作用時，我們才會使用到 Context。

### Better IDE support and autocomplete

使用 Context 時，建議只要有調用到，就應該要加進 Context 的「默認值」，例如：函式可以定義一個 Dummy Function，如此一來，像是我們在輸入 `ctx.` 時，就會出現輸入提示 `onLogout`。

```jsx
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
});

export default AuthContext;
```

### 透過自定義的 Context Provider 提供 Global 狀態

如果是 Global 狀態，其實可以放到更外層，以便讓 App.js 的程式碼更單純，也就是單純用來渲染 Web App 主體而已。

做法就是我們把 Context Provider 寫在 index.js 當中，在 `ReactDOM.render` 的時候就包覆 App。

這麼做可以更集中狀態管理的部分，也能讓組件的邏輯集中，將不同的邏輯分離，算是一個滿推薦的做法。

```jsx
// index.js

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // handle login...
  };

  const logoutHandler = () => {
    // handle logout...
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
```

```jsx
ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
);
```

## Recap

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- React Context
- useContext Hook

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

### Redux 简述

Redux 提供给应用一个可预测的状态管理机制，可以运行于不同的环境

Redux 设计 API 简单，清晰，测试方便，易于上手

### Redux 核心 API 介绍

- store

  全局唯一的状态存贮库，内部维护一个不可变对象树

  store 需要包含 3 个方法：

  - `dispatch` 用来接受 action
  - `getState` 返回 store 内的状态
  - `subscribe` 接受一个回调，在状态更新后会触发回调

- action

  需要修改 store 状态时，发送给 store

  action 必须包含一个`type`属性，用于 reducer 匹配

- reducer

  store 接受到 Action 后，根据 action 来指定更新数据的方法

  接受参数 `state`, `action` 返回更新后的 state

### 简单实现

```javascript
const ADD = 'ADD';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return { value: state.value + action.value };
    default:
      return state;
  }
};

const createStore = reducer => {
  let listeners = [];
  let state = { value: 0 };

  let dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(cb => cb());
  };

  return {
    getState: _ => state,
    subscribe: cb => listeners.push(cb),
    dispatch: dispatch,
  };
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: ADD, value: 5 });

store.dispatch({ type: ADD, value: 10 });
```

### 三大原则

- 单一数据源

- State 是只读的

- 使用纯函数执行修改

### 相关技术

- 函数式编程

- Flux

- Immutable

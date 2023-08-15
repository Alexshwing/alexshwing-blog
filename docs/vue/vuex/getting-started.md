# Vuex
:::tip 参考
[v3.x 官网](https://v3.vuex.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF-%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F)
:::


## 介绍
Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。

它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

![vuex](assets/vuex-01.png)

## 开始
每一个 Vuex 应用的核心就是 store (仓库), 它基本上就是一个容器, 它包含着你的应用中大部分的**状态**, 它和单纯的全局对象区别:
1. Vuex 的状态存储是响应式的
2. 不能直接改变 store 中状态, 采用显式地提交(commit) **mutation** 改变状态

### 最简单的 Store
提供一个初始 state 对象和一些 mutation
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

为了在 Vue 组件中访问 `this.$store` property，你需要为 Vue 实例提供创建好的 store。Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制：
```js
new Vue({
  el: '#app',
  store
})
```

提交变更
```js
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```
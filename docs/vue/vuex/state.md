# State

Vuex 使用**单一状态树** —— 用一个对象就包含了全部的应用层级状态。至此它便作为一个 "唯一数据源" 而存在。这也意味着，每个应用将仅仅包含一个 store 实例。


## 在 Vue 组件中获得 Vuex 状态
计算属性
```js
computed: {
  count () {
    return this.$store.state.count
  }
}
```

## mapState 辅助函数
```js
import { mapState } from 'vuex'
export default {
  data() {
    return {
      localCount: 1,
    }
  },
  computed: mapState({
    count: (state) => state.count,
    countAlias: 'count', // 等价于 state => state.count
    countPlusLocalState(state) {
      return state.count + this.localCount
    },
  }),
}
```
当映射的计算属性的名称与 state 子节点名称相同, 可以给 mapState 传一个字符串数组
```js
computed: mapState(['count', 'msg']),
```

## 对象展开运算符
将从 State 获取的属性和外部对象的计算属性合并
```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```
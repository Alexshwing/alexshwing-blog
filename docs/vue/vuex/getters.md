# Getters

类似于计算属性, getter 的返回值会根据它的依赖被缓存起来, 只有当它的依赖值发生改变才会被重新计算

getter 接受 state 作为第一个参数

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

## 通过属性访问
Getter 会暴露为 store.getters 对象，以属性的形式访问这些值
```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

Getter 也可以接受其他 getter 作为第二个参数：
```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```
```js
store.getters.doneTodosCount // -> 1
```
组件中使用
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

## 通过方法访问
将 getter 返回一个函数, 来实现给 getter 传参
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```
注意, getter 在通过方法访问时，**每次都会去进行调用，而不会缓存结果。**

## mapGetters 辅助函数
```js
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：
```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```
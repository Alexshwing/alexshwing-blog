# v-if 和 v-for
在同一个元素使用时, v-for 优先级比 v-if 高。这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你只想为部分项渲染节点, 这种优先级机制非常有用
```html
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

如果你目的是条件地跳过循环执行, 那么将 v-if 置于外层元素(或 template 中)
```html 
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```

当 v-if 和 v-for 同时存在于同一个元素上时，Vue 会在每次循环迭代时都重新渲染和销毁元素。这可能会导致不必要的 DOM 更新和性能下降，特别是在较长的列表上。这是因为每次循环迭代都会重新计算条件，并进行 DOM 操作

如果只是需要过滤掉不需要的项, 通过计算属性的方式
```vue
<template>
  <div>
    <div v-for="item in filteredItems" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        { id: 1, name: 'Item 1', isActive: true },
        { id: 2, name: 'Item 2', isActive: false },
        { id: 3, name: 'Item 3', isActive: true }
      ]
    }
  },
  computed: {
    filteredItems() {
      return this.arr.filter(item => item.isActive);
    }
  }
}
</script>
```
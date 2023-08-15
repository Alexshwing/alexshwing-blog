# nextTick

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个 tick 才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

## 使用场景
### 隐藏的输入框获取焦点
```vue
<template>
  <div class="container">
    <el-button @click="showInput">显示对话框</el-button>
    <el-input v-if="isShowInput" ref="inputRef" style="width: 200px"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowInput: false,
    }
  },
  methods: {
    showInput() {
      this.isShowInput = true
      // ×
      // this.$refs.inputRef.focus()

      // √
      this.$nextTick(() => {
        this.$refs.inputRef.focus()
      })
    },
  },
}
</script>
```
### 确保 mounted 所有子组件全部挂载
> 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted。

```js
mounted() {
  this.$nextTick(() => {
    // 你想要对视图进行的修改操作
  })
}
```
## 原理

TODO: 事件循环

[Vue源码详解之nextTick](https://segmentfault.com/a/1190000008589736)
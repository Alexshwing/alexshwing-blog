# 强制刷新页面

## 1. 路由
`this.$router.go(0)`、`window.location.reload()`、`window.location.href = window.location.href;`

浏览器重新加载, 页面闪烁和空白, 降低用户体验

## 2. `provide` 和 `inject`
- 父组件
```vue
<template>
  <div id="app">
    <router-view v-if="isShow" />
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      isShow: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      this.isShow = false;

      this.$nextTick(() => {
        this.isShow = true;
      });
    },
  },
}
</script>
```

- 子组件
```vue
<script>
export default {
  inject: ["reload"],
  methods: {
    reload() {
      this.reload()
    }
  }
}
</script>
```

> 给`router-view`绑定 key 刷新同理

## 3. `$forceUpdate()`
强制该组件重新渲染
- 当组件中的数据发生变化时，如果这些数据对应的视图没有更新，可以使用 $forceUpdate 方法强制更新视图
- 当组件中使用了一些无法被 Vue.js 监听到的数据（例如原生 DOM 属性），如果这些数据发生变化时，需要使用 $forceUpdate 方法强制更新视图。

**在路由地址参数变化时刷新页面 没有效果**
# 组件渲染顺序
使用场景: 兄弟组件渲染时, 其中一个组件的数据依赖另一个组件
### About.vue
```vue
<template>
  <div class="container">
    <Bar @barMounted="isShowFoo = true"></Bar>
    <Foo v-if="isShowFoo"></Foo>
  </div>
</template>
<script>
import Bar from '@/components/Bar.vue'
import Foo from '@/components/Foo.vue'
export default {
  components: {
    Bar,
    Foo,
  },
  data() {
    return {
      isShowFoo: false,
    }
  },
}
</script>
```
### Bar.vue
```vue
<template>
  <div>Bar</div>
</template>

<script>
export default {
  name: 'Bar',
  created() {
    setTimeout(() => {
      localStorage.setItem('name', 'alexshwing')
      this.$emit('barMounted')
    }, 5000)
  },
}
</script>

```
### Foo.vue
```vue
<template>
  <div>
    Foo
    <br />
    {{ name }}
  </div>
</template>
<script>
export default {
  name: 'Foo',
  data() {
    return {
      name: '',
    }
  },
  mounted() {
    this.name = localStorage.getItem('name')
  },
}
</script>

```
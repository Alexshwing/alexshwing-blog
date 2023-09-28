# key

## 用 key 管理可复用的元素
Vue 会尽可能高效地渲染元素, 通常会复用已有元素而不是从头开始渲染。
```vue
<template>
  <div class="container">
    <el-button @click="num *= -1">click</el-button>
    <br />
    <template v-if="num === 1">
      <label>Username</label>
      <input placeholder="Enter your username" />
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" />
    </template>
  </div>
</template>
```
那么上面的代码中切换 num 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素, `<input>` 不会被替换掉, 仅替换了它的`placeholder`

## el-table 多表格切换展开行保留问题
```vue
<template>
  <div class="container">
    <el-button @click="tableNum *= -1">click</el-button>

    <el-table :data="[{ id: 1 }]" v-if="tableNum === 1">
      <el-table-column type="expand">123 </el-table-column>
      <el-table-column label="商品 ID" prop="id"> </el-table-column>
    </el-table>

    <el-table :data="[{ id: 1 }]" v-if="tableNum === -1">
      <el-table-column label="商品 ID" prop="id"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableNum: 1,
    }
  },
}
</script>

```
使用`v-if`切换, 从而导致了`el-table-column`内容被复用下来, 仅仅是替换了其中的一些内容, 从而导致`expands`属性被遗留下来

### 解决
1. 采用 `v-show`
2. `el-table` 添加 `key` 属性
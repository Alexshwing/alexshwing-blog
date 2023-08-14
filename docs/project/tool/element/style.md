# 样式

## 表格 `hover` 高亮背景消失
```css
::v-deep .el-table .el-table__body tr.hover-row > td {
  background-color: transparent !important;
}
```

## `弹窗类组件` 修改样式
通过设置 `customClass` 属性, 并在一个没有 `scoped` 的 `style` 标签中编写样式 (弹窗组件挂载在 `body` 元素上实现的, 不受到父组件 `scoped` 样式限制, 通过添加 `customClass` 限定样式修改范围, 避免对全局样式进行修改)
```vue
<script>
export default {
  methods: {
    handleClick() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        customClass: 'alert',
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
<style lang="scss">
.alert.el-message-box {
  background: pink;
}
</style>
```
## 表格单元格为空填充占位符
```scss
::v-deep .el-table .el-table__body td .cell:empty::after {
  content: "-";
}
```
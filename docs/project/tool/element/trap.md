# 踩坑
## 树形表格 row-key 
- 不能为 0, undifined, null
```js
getKeyOfRow(row, index) {
  const rowKey = this.table.rowKey;
  if (rowKey) {
    return getRowIdentity(row, rowKey);
  }
  return index;
},
```

## ElementUI 槽点
1. API 设计

- `el-checkbox` 和 `el-radio` 采用 label 作为值( label 本身没有值的意思)

2. 功能支持

- `el-select` 对插槽的支持
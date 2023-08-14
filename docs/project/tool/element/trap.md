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
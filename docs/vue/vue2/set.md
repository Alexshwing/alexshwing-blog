# Vue.$set
- Vue.$set(target, propertyName / index, value)
- 向响应式对象添加一个 property , 确保这个新的 property 同样是响应式地，且触发视图更新。
- 它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

## 原理
TODO
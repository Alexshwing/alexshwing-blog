# 对象

## Object.keys()
返回一个由给定对象自身的可枚举的字符串键属性名组成的数组

### 规范定义
1. 调用 ToObject(O) 将结果赋值给变量 obj
2. 调用 EnumerableOwnPropertyNames(obj, "key") 将结果赋值给变量 nameList
3. 调用 CreateArrayFromObj(nameList) 得到最终的结果

### 返回的对象属性顺序
```js
const obj = {
  2: true,
  1: true,
  'a': true,
  [Symbol(1)]: true
}
console.log(Object.keys(obj)) // [ '1', '2', 'a' ]
```

- 将所有合法的数组索引按升序排序
- 将所有字符串类型索引按属性创建时间按升序返回
- 将所有 Symbol 类型索引按属性创建时间按升序返回 (但`EnumerableOwnPropertyNames`规范中规定返回值只包含字符串属性)

:::tip 参考
- [Object.keys的‘诡异’特性，你值得收藏！](https://juejin.cn/post/7146386542506803207)
- [一起学规范系列 —— Object.keys() 的顺序是如何定义的？](https://zhuanlan.zhihu.com/p/389201653)
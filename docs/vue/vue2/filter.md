# 过滤器

## 介绍
Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：双花括号插值和 v-bind 表达式。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。

## 给图片地址添加时间戳
```js
Vue.filter("imgUrl", function (value) {
  return value + '?timestamp' + (new Date().getTime())
})
```
```vue
<img :src="imageUrl | imgUrl" alt="Image">
```
每次加载图片时，图片路径都将携带时间戳，从而避免了图片缓存的问题。
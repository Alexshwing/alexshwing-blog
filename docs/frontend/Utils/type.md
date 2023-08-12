# 判断数据类型
## 一、Object.prototype.toString.call
```js
function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
[1, "1", true, null, undefined, {}, [], new RegExp(), new Date(), new Map(), new Set(), new WeakMap(), BigInt(1), () => {}].forEach((obj) => console.log(type(obj)));
```

## 二、typeof 
- 判断基本数据类型、对象、数组
- null 判断为 object
> [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)
> 
> 在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"。
- 使用 new 调用构造函数都将返回非基本数据类型("object" 或 "function")。大多数返回对象, Function 返回 function
- typeof NaN === 'number' 尽管它是 "Not-A-Number" (非数值) 缩写 
```js
function type(obj) {
  return typeof obj
}
```

## 三、instanceof
- 检测构造函数的 prototype 属性是否出现在实例的原型链上
```js
function instanceOf(obj, constructor) {
  return obj instanceof constructor
}

console.log(instanceOf({}, Object)) // true
console.log(instanceOf([], Array)) // true
console.log(instanceOf([], Object)) // true
console.log(instanceOf(new Date(), Date)) // true
console.log(instanceOf(null, Object)) // true
console.log(instanceOf(undefined, Object)) // true
console.log(instanceOf(1, Object)) // true
```
## 四、constructor
- 除了 null 和 undefined
```js
console.log((1).constructor === Number)
console.log(('1').constructor === String)
console.log((true).constructor === Boolean)
console.log(({}).constructor === Object)
console.log(([]).constructor === Array)
console.log((new RegExp()).constructor === RegExp)
console.log((null).constructor) // TypeError: Cannot read property 'constructor' of null
console.log((undefined).constructor) // TypeError: Cannot read property 'constructor' of undefined
```

## 五、null
```js
const obj = null

if (obj === null) {
  console.log("1")
}

if (!obj && typeof obj !== 'undefined' && obj !== 0) {
  console.log("2")
}

if (!obj && typeof obj === 'object') {
  console.log("3")
}
```
## 六、未定义 undefined
```js
let obj
if (typeof obj === 'undefined') {
  console.log("1")
}
if (obj === void 0) {
  console.log("2")
}
```

## 七、数组
```js
const arr = []

console.log(Array.isArray(arr))
console.log(arr instanceof Array)
console.log('array' === Object.prototype.toString.call(arr).slice(8, -1).toLowerCase())
console.log(arr.constructor === Array)
console.log(Array.prototype.isPrototypeOf(arr)) // isPrototypeOf(obj) 检查一个对象是否存在于另一个对象的原型链上(obj 要搜索其原型链的对象)
console.log(Object.getPrototypeOf(arr) === Array.prototype) // getPrototypeOf 对象的原型(即内部 [[Prototype]] 属性的值)
```
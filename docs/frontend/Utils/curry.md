# 柯里化
- 判断函数的参数是否达到要求, 达到的话直接执行
- 没达到的话递归继续执行当前函数的柯里化
- 通过 fn.length 判断实参的个数
```js
function add(a, b, c) {
  return a + b + c;
}

function curry(fn, ...args) {
  return args.length >= fn.length
    ? fn(...args)
    : (...args2) => curry(fn, ...args, ...args2);
}

const fn = curry(add);
console.log(fn(1)(2)(3));
console.log(fn(1, 2)(3));
console.log(fn(1)(2, 3));
console.log(fn(1, 2, 3));
```
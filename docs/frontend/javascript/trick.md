# trick

## a === 1 && a === 2 && a === 3

- Object.property 
```js
let tmp = 1;
Object.defineProperty(window, "a", {
  get() {
    return tmp++;
  },
});

console.log(a === 1 && a === 2 && a === 3);
```

- valueOf / toString

适用于非全等
```js
const a = {
  value: 1,
  valueOf() {
    return this.value++;
  }
}
console.log(a == 1 && a == 2 && a == 3);
```

```js
const a = [1, 2, 3];
a.valueOf = a.shift;
console.log(a == 1 && a == 2 && a == 3);
```


- 特殊符号

插入不可见字符
```js
const aﾠ = 1;
const a = 2;
const ﾠa = 3;
console.log(aﾠ === 1 && a === 2 && ﾠa === 3);
```
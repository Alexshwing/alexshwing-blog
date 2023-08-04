# 手写

## 一. 数组
### forEach
```js
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};
```
### map
```js
Array.prototype.myMap = function (callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this));
  }
  return res;
};
```
### filter
```js
Array.prototype.myFilter = function (callback) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this) && res.push(this[i]);
  }
  return res;
};
```
### some
```js
Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const ok = callback(this[i], i, this);
    if (ok) {
      return true;
    }
  }
  return false;
};
```
### every
```js
Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const ok = callback(this[i], i, this);
    if (!ok) {
      return false;
    }
  }
  return true;
};
```
### reduce
```js
Array.prototype.myReduce = function (callback, ...args) {
  let start = 0;
  let res = 0;
  if (args.length) {
    res = args[0];
  } else {
    start = 1;
    res = this[0];
  }
  for (let i = start; i < this.length; i++) {
    res = callback(res, this[i], i, this);
  }
  return res;
};
```
### findIndex
```js
Array.prototype.myFindIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    let ok = callback(this[i], i, this);
    if (ok) {
      return i;
    }
  }
  return -1;
};
```
### includes
```js
Array.prototype.myIncludes = function (target, fromIndex = 0) {
  if (fromIndex < 0) {
    fromIndex += this.length;
  }
  for (let i = fromIndex; i < this.length; i++) {
    if (
      target === this[i] ||
      (Number.isNaN(target) && Number.isNaN(this[i]))
    ) {
      return true;
    }
  }
  return false;
};
```
### flat
- reduce
```js
function myFlat(arr) {
  return arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? myFlat(cur) : cur),
    []
  );
}
```
- toString
```js
function myFlat(arr) {
  return arr.toString().split(",").map(Number);
}
```
- concat + 拓展运算符
```js
function myFlat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```
### unique
```js
const arr = [1, 1, "1", "1", NaN, NaN, {}, {}, true, true];
```
- Set / Map
```js
function myUnique(arr) {
  return Array.from(new Set(arr)); // [1, '1', NaN, {}, {}, true]
}
```
可以去重`NaN`, 不能去重`空对象`
- indexOf
```js
function myUnique(arr) {
  const res = [];
  for (const x of arr) {
    if (res.indexOf(x) === -1) {
      res.push(x);
    }
  }
  return res; // [1, '1', NaN, NaN, {}, {}, true]
}
```
不能去重`NaN`和`空对象`
- includes
```js
function myUnique(arr) {
  const res = [];
  for (const x of arr) {
    if (!res.includes(x)) {
      res.push(x);
    }
  }
  return res; // [1, '1', NaN, {}, {}, true]
}
```
不能去重`空对象`
- reduce + inclues
```js
function myUnique(arr) {
  return arr.reduce(
    (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
    []
  );
}
```
不能去重`空对象`
- filter + 对象
```js
function myUnique(arr) {
  const obj = {};
  // typeof item + item 解决 '1' 和 1 无法去重问题
  return arr.filter((item) =>
    Object.hasOwn(obj, typeof item + item)
      ? false
      : (obj[typeof item + item] = true)
  );
}
```

## 二. 对象
### 判断类型
```js
const arr = [1, Number(1), "1", true, null, undefined, BigInt(1), Symbol(1), {}, [], new Date(), new RegExp()];
function type(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}
```

## 三. 优化
### 防抖
防止抖动, 单位时间内触发就会重置, 避免事件被触发多次

重在清零

按钮重复提交发送多次请求
```html
<input type="text" id="input" />
<script>
  const input = document.getElementById("input");
  function request(e) {
    console.log(e.target.value);
  }
  function debounce(fn, wait) {
    let timer = null;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    };
  }
  input.addEventListener("keyup", debounce(request, 1000));
<script>
```
### 节流
单位时间内只触发一次

重在开关锁

鼠标、滚动事件重复触发
```html
<style>
    body {
        height: 10000px;
    }
</style>

<script>
  function request() {
    console.log("send request");
  }
  function throttle(fn, wait) {
    let timer = null;
    return (...args) => {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, wait);
    };
  }
  window.addEventListener("scroll", throttle(request, 1000));
</script>
```

## 四、树
### 树转列表
```js
const tree = [
  {
    id: 1,
    name: "node-1",
    children: [
      {
        id: 2,
        name: "node-1-1",
        children: [
          {
            id: 3,
            name: "node-1-1-1",
            children: [],
          },
          {
            id: 4,
            name: "node-1-1-2",
          },
        ],
      },
    ],
  },
];
```
```js
function tree2List(tree) {
  const res = [];
  function dfs(arr, depth = 0) {
    for (const u of arr) {
      res.push({ ...u, depth });
      if (u.children && u.children.length > 0) {
        dfs(u.children, depth + 1);
      }
    }
  }
  dfs(tree);
  return res;
}
```
### 列表转树
```js
const arr = [
  { id: 1, name: "node-1", pid: 0 },
  { id: 2, name: "node-2", pid: 1 },
  { id: 3, name: "node-3", pid: 1 },
  { id: 4, name: "node-4", pid: 3 },
  { id: 5, name: "node-5", pid: 4 },
  { id: 6, name: "node-6", pid: 0 },
];
```
```js
function list2Tree(arr) {
  const res = [],
    mp = {};
  for (const item of arr) {
    const { id, pid } = item;
    if (!mp[id]) {
      mp[id] = { children: [] };
    }
    mp[id] = { ...item, children: mp[id].children };
    if (pid === 0) {
      res.push(mp[id]);
    } else {
      if (!mp[pid]) {
        mp[pid] = { children: [] };
      }
      mp[pid].children.push(mp[id]);
    }
  }
  return res;
}
```

### 树添加属性
```js
const tree = [
  {
    name: "node-1",
    children: [
      {
        name: "node-2",
        children: [{ name: "node-3" }],
      },
      {
        name: "node-4",
      },
    ],
  },
];
```
```js
let index = 0;
function addProp(tree, propName) {
  return tree.map((item) => ({
    ...item,
    [propName]: index++,
    children: item.children ? addProp(item.children, propName) : [],
  }));
}
console.log(addProp(tree, "pos"));
```
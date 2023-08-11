# 树

## DOM2JSON
```html
<div class="fa">
  <div class="ch-1">ch-1</div>
  <div class="ch-2">
    <div class="ch-2-1">ch-2-1</div>
  </div>
</div>
```
```js
function dom2JSON(domTree) {
  const res = {
    name: domTree.tagName.toLowerCase(),
    class: domTree.className,
    children: [],
  };
  res.children = Array.from(domTree.children);
  if (res.children) {
    res.children.forEach((child, i) => {
      res.children[i] = dom2JSON(child);
    });
  }
  return res;
}

console.log(dom2JSON(document.querySelector(".fa")));
```

## JSON2DOM
```js
const data = {
  tag: "DIV",
  attrs: {
    id: "app",
  },
  children: [
    {
      tag: "DIV",
      attrs: {
        class: "title",
      },
      children: [{ tag: "SPAN", children: ["alexshwing"] }],
    },
  ],
};
```
```js
function json2DOM(obj) {
  if (typeof obj === "number") {
    obj = String(obj);
  }
  if (typeof obj === "string") {
    return document.createTextNode(obj);
  }
  const res = document.createElement(obj.tag);
  if (obj.attrs) {
    const keys = Object.keys(obj.attrs);
    keys.forEach((key) => {
      const value = obj.attrs[key];
      res.setAttribute(key, value);
    });
  }
  obj.children.forEach((child) => res.appendChild(json2DOM(child)));
  return res;
}

console.log(json2DOM(data));
```
## 树转列表
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
## 列表转树
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

## 树添加属性
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
## 对象字符串转为树形结构
```js
const obj = {
  "a-b-c-d": 1,
  "a-b-c-e": 2,
  "a-b-f": 3,
  "a-j": 4,
};
```
```js
function obj2Tree(obj) {
  const res = {};
  for (const [key, value] of Object.entries(obj)) {
    const arr = key.split("-"),
      n = arr.length;
    let tmp = res;
    arr.forEach((item, i) => {
      if (i === n - 1) {
        tmp[item] = value;
      } else {
        if (!tmp[item]) {
          tmp[item] = {};
        }
        tmp = tmp[item];
      }
    });
  }
  return res;
}
```
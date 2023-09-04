# PromisePool
- Promise.race + Queue
```js
const promisePool = async function (functions, n) {
  const queue = new Set();
  const resolved = [];
  for (const task of functions) {
    const x = task().then((res) => {
      resolved.push(res);
      queue.delete(x);
    });
    queue.add(x);
    if (queue.size >= n) {
      await Promise.race(queue);
    }
  }
  await Promise.allSettled(queue);
  return resolved;
};

const sleep = (t) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(t);
    }, t)
  );

const functions = [() => sleep(300), () => sleep(400), () => sleep(200)];
const n = 5;

promisePool(functions, n).then(console.log);
```
- Promise.all + map + shift
```js
const promisePool = async function (functions, n) {
  return Promise.all(
    [...new Array(n)].map(async () => {
      while (functions.length > 0) {
        const res = await functions.shift()();
        console.log(res);
      }
    })
  );
};

const sleep = (t) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(t);
    }, t)
  );

const functions = [() => sleep(300), () => sleep(400), () => sleep(200)];
const n = 5;

promisePool(functions, n).then(console.log);
```

## [p-limit](https://github.com/sindresorhus/p-limit/blob/main/index.js)
- [深入p-limit源码，如何使用p-limit来限制并发数❓](https://juejin.cn/post/7127831645167550471)
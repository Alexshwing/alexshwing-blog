# 竞态
## 一、什么是竞态
竞态问题, 它旨在描述一个系统或者进程的输出依赖于不受控制的事件出现顺序或出现时机。

竞态问题出现的原因是无法保证异步操作的完成按照它们开始的顺序

在前端开发中, 常见于搜索、分页、选项卡等切换场景

## 二、取消过期请求
### 1. XMLHttpRequest 取消请求
```js
const xhr = new XMLHttpRequest()

xhr.open('GET', 'http://xx')
xhr.send()

xhr.abort() // 取消请求
```
### 2. fetch 取消请求
```js
const controller = new AbortController()
const signal = controller.signal;


fetch('/xxx', {
  signal
}).then(function(res) {})

controller.abort() // 取消请求
```
### 3. axios 取消请求```
```js
const controller = new AbortController()

axios.get('/xxx', {
  signal: controller.signal
}).then(function(res) {})

controller.abort() // 取消请求
```


## 三、忽略过期请求
### 1. 可取消的 Promise
- `awesome-only-resolves-last-promise`
```js
function onlyResolvesLast(fn) {
  // 保存上一个请求的 cancel 方法
  let cancelPrevious = null; 

  const wrappedFn = (...args) => {
    // 当前请求执行前，先 cancel 上一个请求
    cancelPrevious && cancelPrevious();
    // 执行当前请求
    const result = fn.apply(this, args); 
    
    // 创建指令式的 promise，暴露 cancel 方法并保存
    const { promise, cancel } = createImperativePromise(result);
    cancelPrevious = cancel;
    
    return promise;
  };

  return wrappedFn;
}

const fn = (duration) => 
  new Promise(r => {    
    setTimeout(r, duration);  
  });

const wrappedFn = onlyResolvesLast(fn);

wrappedFn(500).then(() => console.log(1));
wrappedFn(1000).then(() => console.log(2));
wrappedFn(100).then(() => console.log(3));

// 输出 3
```
### 2. 使用唯一 id 标识每次请求
```js
function onlyResolveLast(fn) {
  let id = 0
  const wrappedFn = (...args) => {
    const fetchId = id + 1
    id = fetchId

    const res = fn.apply(this, args)

    return new Promise((resolve, reject) => {
      Promise.resolve(res).then((value) => {
        // 只处理最新一次请求
        if (fetchId === id) {
          resolve(value)
        }
      }, (error) => {
        // 只处理最新一次请求
        if (fetchId === id) {
          reject(error)
        }
      })
    })
  }
}
```

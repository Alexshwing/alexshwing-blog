# setTimeout 和 setInterval

## setTimeout 模拟 setInterval
```js
let timerMp = {};
const _setInterval = function (cb, wait, ...args) {
  let id = Symbol();
  const execute = function (cb, wait) {
    timerMp[id] = setTimeout(function () {
      cb(...args);
      execute(cb, wait);
    }, wait);
  };
  execute(cb, wait);
  return id;
};
const _clearInterval = function (id) {
  if (id in timerMp) {
    clearTimeout(timerMp[id]);
    delete timerMp[id];
  }
};

const timer = _setInterval(() => console.log("alex"), 1000);
setTimeout(() => {
  _clearInterval(timer);
  console.log("closed");
}, 4050);
```

## setInterval 模拟 setTimeout
```js
function _setTimeout(cb, wait, ...args) {
  const timer = setInterval(() => {
    cb(...args);
    clearInterval(timer);
  }, wait);
}
_setTimeout(() => console.log("alex"), 1000);
```

## 减少误差
- 无法完全消除
```js
// Rewrite setTimeout to reduce error
function _setTimeout(cb, wait, ...args) {
  const startTime = Date.now();
  let index = 0;
  let timer = null;

  const run = function () {
    const offset = Date.now() - (startTime + index * wait);
    console.log(`第${index}次, 延迟时间为${offset}`);
    timer = setTimeout(() => {
      cb.apply(this, args);
      index++;
      run();
    }, wait - offset);
  };

  run();

  return () => clearTimeout(timer);
}

const stop = _setTimeout(() => {}, 1000);
setTimeout(() => {
  stop();
}, 5000);
```
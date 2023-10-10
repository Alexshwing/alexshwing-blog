# setTimeout

[HTML 标准](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) 规定, 当`setTimeout`嵌套层级为 5 次, 浏览器强制执行 4 毫秒的最小超时

其中, Chrome 浏览器在不满足嵌套层级的情况下，最小延迟时间设置为 1ms。
```js
setTimeout(() => console.log(5), 5);
setTimeout(() => console.log(4), 4);
setTimeout(() => console.log(3), 3);
setTimeout(() => console.log(2), 2);
setTimeout(() => console.log(1), 1);
setTimeout(() => console.log(0), 0);
// 1 0 2 3 4 5
```


- 零延时定时器

利用 postMessage 模拟定时器
```js
(function () {
  var timeouts = [];
  var messageName = 'zero-timeout-message';

  // 保持 setTimeout 的形态，只接受单个函数的参数，延迟始终为 0。
  function setZeroTimeout(fn) {
    timeouts.push(fn);
    window.postMessage(messageName, '*');
  }

  function handleMessage(event) {
    if (event.source == window && event.data == messageName) {
      event.stopPropagation();
      if (timeouts.length > 0) {
        var fn = timeouts.shift();
        fn();
      }
    }
  }

  window.addEventListener('message', handleMessage, true);

  // 把 API 添加到 window 对象上
  window.setZeroTimeout = setZeroTimeout;
})();

```
> 应用场景(TODO):
> 
> React 时间切片 - [React Scheduler 为什么使用 MessageChannel 实现](https://juejin.cn/post/6953804914715803678)

- 毫秒级别定时器

利用 window.requestAnimationFrame()  告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。(该回调函数会传入 DOMHighResTimeStamp 参数，该参数与 performance.now() 的返回值相同，它表示 requestAnimationFrame() 开始执行回调函数的时刻, 该时间戳是一个十进制数，单位为毫秒，最小精度为 1ms)


:::tip 参考
- [如何实现比 setTimeout 快 80 倍的定时器？](https://juejin.cn/post/7249633061440749628)
- [为什么 setTimeout 有最小时延 4ms ?](https://juejin.cn/post/6846687590616137742)
- [基于requestAnimationFrame实现高精度毫秒级正向计时器](https://juejin.cn/post/7187193005063798844?searchId=20231010215656C162B85C29661E17FB95)
:::
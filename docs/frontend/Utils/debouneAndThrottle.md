# 防抖节流
## 防抖
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
## 节流
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
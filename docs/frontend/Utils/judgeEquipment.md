# 判断设备类型
## 判断浏览器是`PC端`还是`移动端`
```javascript
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
```
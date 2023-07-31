# 工具函数

## 1. 文件
### `Base64`字符串转`Blob`
```javascript
function dataURL2Blob(dataurl) {
  var arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n -- ) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}
```
### `Base64`字符串转`file`
```javascript
function dataURL2File(dataurl, filename) {
  var arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n -- ) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
}
```
## 2. 对象
### 解析`URL`
```javascript
const url = 'http://www.getui.com?user=superman&id=345&id=678&city=%E6%9D%AD%E5%B7%9E&enabled'
function parseUrlParams() {
    const [href, params] = url.split("?")
    const res = {}
    params && params.split("&").map(item => {
        let [key, value = true] = item.split("=")
        value = typeof value === 'boolean' ? value : decodeURIComponent(value) // 转中文
        if (!res[key]) {
            res[key] = value
        } else {
            if (Array.isArray(res[key])) {
                res[key].push(value)
            } else {
                res[key] = [res[key], value]
            }
        }
    })
    return res
}
console.log(parseUrlParams(url)) // {user: 'superman', id: Array(2), city: '杭州', enabled: true}
```
## 3. 数组
## 4. 字符串
## 5. 数学
### 返回区间`[min, max]`中的随机一个整数
```javascript
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```
## 6. 浏览器
### 判断浏览器是`PC端`还是`移动端`
```javascript
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
```
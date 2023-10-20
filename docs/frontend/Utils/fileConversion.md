# 文件转换

## `Base64`字符串转`Blob`
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
## `Base64`字符串转`file`
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

## `图片url` 转 `Base64`
```js
/**
 * 将给定 url 的图片转换为 base64 字符串
 * @param {String} url 图片 url
 * @return {String} base64 字符串
 */
async url2Base64(url) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let img = new Image()
    img.src = url
    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, img.width, img.height)
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/jpeg', 1)
      resolve(dataURL)
      canvas = null
      img = null
    }
    img.onerror = function () {
      reject(new Error('Could not load image at ' + imageUrl))
    }
  })
},
```
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
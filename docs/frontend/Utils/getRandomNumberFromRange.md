# 随机数

## 返回区间`[min, max]`中的随机一个整数
```javascript
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```
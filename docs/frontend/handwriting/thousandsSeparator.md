# 千分位格式化
```js
function thousandsSeparator(num) {
  let [integer, decimal = ""] = Number.isInteger(num)
    ? num.toString().split(".")
    : num.toFixed(2).toString().split(".");
  integer = integer.split("").reverse();
  let res = [],
    n = integer.length;
  for (let i = 0; i < n; i++) {
    if (i && i % 3 === 0) {
      res.push(",");
    }
    res.push(integer[i]);
  }
  res = res.reverse().join("");
  return res + (decimal ? `.${decimal}` : "");
}
```
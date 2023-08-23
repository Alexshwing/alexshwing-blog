# 颜色转换

```js
const item = document.querySelector(".item");
const backgroundColor = getComputedStyle(item).backgroundColor;
function rbgToNumberArr(rgb) {
  const values = rgb.match(/\d+/g);
  return values.map(Number);
}
const arr = rbgToNumberArr(backgroundColor)
```
- Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值

## RGB 转 HEX
```js
function rbgToHex(r, g, b) {
  return (
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
}
```
- `1 << 24` 作用: 确保在 `slice(1)` 剥离前导 1 后, 十六进制表示保留所需的任何零
- `r = 0, g = 0, b = 51`,  `((r << 16) + (g << 8) + b).toString(16)` 结果为 "33", 增加 `1 << 24` 得到 `1000033` 


## HEX 转 RGB
```js
function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return [r, g, b];
}
```

## RGB 转 HSL
HSL 颜色包括三个属性：色相、饱和度和亮度。其中，色相指的是颜色的基本色调，饱和度指的是颜色的纯度或强度，亮度指的是颜色的明暗程度
```js
function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l };
}
```

## HSL 转 RGB
```js
function hslToRgb(h, s, l) {
  let r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
```

:::tip 参考
[JavaScript 中的 RGB、HEX 和 HSL 颜色相互转换](https://juejin.cn/post/7225474899480969253)
:::
      
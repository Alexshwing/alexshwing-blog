# 根据背景色切换黑白文字

## CSS 滤镜
![](./assets/black-white-text-color.jpg)

- grayscale
彩色文字变黑白: 深色变为深灰, 浅色变为浅灰
- contrast
调整对比度: 黑的更黑, 白的更白, 如果是浅灰变为白色, 如果是深灰变为黑色
- invert
颠倒黑白
- 缺点: 文字需要包裹一层标签
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 200px;
      height: 200px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffeb3b;
      /* 容器和文字用同一种颜色表示，目的是让文字颜色和背景相关联 */
      background-color: currentColor;
    }

    .box2 {
      width: 200px;
      height: 200px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: purple;
      /* 容器和文字用同一种颜色表示，目的是让文字颜色和背景相关联 */
      background-color: currentColor;
    }

    .txt {
      filter: grayscale(1) contrast(999) invert(1);
    }
  </style>
</head>

<body>
  <div class="box">
    <span class="txt">Alexshwing</span>
  </div>
  <div class="box2">
    <span class="txt">Alexshwing</span>
  </div>
</body>

</html>
```

## JS 计算公式实现
利用公式去计算背景色的深浅度
```js
luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
```
这样可以得到一个 0 ~ 1 之间的范围值，可以根据需求，设定一个阈值，超过表示为浅色，否则为深色。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    div {
      width: 200px;
      height: 200px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      /* 容器和文字用同一种颜色表示，目的是让文字颜色和背景相关联 */
      background-color: currentColor;
    }
  </style>
</head>

<body>
  <div class="box" style="color: rgba(255,235,59,1)">
    <span class="txt">Alexshwing</span>
  </div>
  <div class="box2" style="color: rgba(128,0,128,1)">
    <span class="txt">Alexshwing</span>
  </div>
  <script>
    const box = document.querySelector(".box")
    const box2 = document.querySelector(".box2")
    function getLuma(el) {
      const color = el.style.color
      // 使用正则表达式匹配颜色值中的数字部分
      const colorValues = color.match(/\d+/g);

      // 将字符串数组转换为整数数组
      const [red, green, blue] = colorValues.map(Number);
      return (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255
    }

    box.querySelector(".txt").style.color = getLuma(box) <= 0.5 ? 'white' : "black"
    box2.querySelector(".txt").style.color = getLuma(box2) <= 0.5 ? 'white' : "black"
  </script>
</body>

</html>
```

:::tip 来源
[CSS 如何根据背景色自动切换黑白文字？](https://juejin.cn/post/7181328175774269500)
:::
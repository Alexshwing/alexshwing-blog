# 通用样式
## 小于 12 px 的字体
```scss
.font {
  display: inline-block; // 缩放在行内或行内块元素生效
  transform: scale(0.5); // 缩放比例
  transform-origin: left top; // 缩放源点
}
```

## 0.5 px 线
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .line {
      width: 300px;
      background-color: #000;
    }

    .one-px {
      height: 1px;
    }

    .half-px {
      height: 1px;
      transform-origin: 50% 100%;
      /* 防止线模糊 */
      transform: scaleY(0.5);
    }
  </style>
</head>

<body>
  <p>0.5px</p>
  <div class="line half-px"></div>
  <p>1px</p>
  <div class="line one-px"></div>
</body>

</html>
```
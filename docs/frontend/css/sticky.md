# sticky

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。
## 使用条件
- 父元素不能 `overflow:hidden` 或者 `overflow:auto`
- 必须指定 `top`、`right`、`bottom`、`left`四个值之一, 才可使粘性定位生效。否则其行为与相对定位相同。
- 父元素的高度不能低于 sticky 元素的高度
- sticky 元素仅在其父元素内生效

```css
.sticky-header {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
```

## 使用场景
### 1. 吸顶
### 2. 回到顶部
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    html,
    body {
      scroll-behavior: smooth;
    }

    .app-container {
      height: 4000px;
      background-color: pink;
    }

    a {
      display: block;
      color: #fff;
      background-color: red;
      width: 100px;

      position: sticky;
      top: -60px;
      transform: translateY(100vh);
      float: right;
    }
  </style>
</head>

<body>
  <div class="app-container">
    <a href="#">回到顶部</a>
  </div>
</body>

</html>
```
[CSS sticky实现返回顶部](https://juejin.cn/post/6992018973856383013)


## 兼容 IE

[stickyfill](https://github.com/wilddeer/stickyfill)

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      height: 12000px;
    }

    .sticky-header {
      position: sticky;
      position: -webkit-sticky;
      top: 0;
      height: 200px;
      background-color: pink;
    }
  </style>
</head>

<body>
  <div class="sticky-header"></div>
  <script src="./stickyfill.min.js"></script>
  <script>
    var stickyHeader = document.querySelectorAll(".sticky-header")
    Stickyfill.add(stickyHeader)
  </script>
</body>

</html>

```


### 源码解读
position: sticky 当元素原本的定位处于界面中时，就像 position: absolute 一样。

当元素移动到本该隐藏的情况下，就像 position: fixed 一样。

当元素到达父元素底部，则贴着父元素底部，直至消失。就像 position: absolute; bottom: 0 一样。

[position:sticky 的 polyfill——stickyfill 源码浅析](https://juejin.cn/post/6844903794824708104#heading-6)



# 隐藏元素
```html
<style>
  .red,
  .pink {
    width: 10vh;
    height: 10vh;
  }

  .red {
    background-color: red;
  }

  .pink {
    background-color: pink;
  }

  span {
    visibility: visible;
  }
</style>

<body>
  <div class="red">
    <span>red</span>
  </div>
  <div class="pink"></div>
</body>
```

## display: none
- 不占位
- 触发回流重绘
```css
.red {
  display: none;
}
```

## visibility: hidden
- 占位
- 子元素显示
- 无法交互
- 触发重绘
```css
.red {
  visibility: hidden;
}
```

## opacity: 0
- 占位
- 子元素透明度也改变
- 可交互
- 不触发回流和重绘
```css
.red {
  opacity: 0;
}
```

## 绝对定位
- 效果同 display: none
```css
.red {
  position: absolute;
  top: -999999999px;
  left: -999999999px;
}
```

## 相对定位
- 效果同 visibility: hidden
```css
.red {
  position: relative;
  top: -999999999px;
  left: -999999999px;
}
```

## transform: scale(0)
- 缩放使元素不可见
- 占位, 但实际宽高为0
- 无法交互
- 无法作用于行内元素
```css
.red {
  transform: scale(0)
}
```

## clip-path
- 创建一个剪辑区域, 确定元素哪部分可见
- 占位
- 仅现代浏览器使用
- 无法交互
```css
.red {
  clip-path: circle(0);
}
```

## z-index

```css
.red {
  z-index: -1;
}
```

## 缩小尺寸

```css
div {
  height: 0;
  padding: 0;
  overflow: hidden;
}
```
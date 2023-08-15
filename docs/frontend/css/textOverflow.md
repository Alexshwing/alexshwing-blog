# 文本溢出

```vue
<template>
  <div class="container">
    这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本这是一段很长的文本
  </div>
</template>
```
## 单行文本溢出
```scss
.container {
  width: 100px;
  border: 1px solid black;
  overflow: hidden; // 溢出隐藏
  text-overflow: ellipsis; // 文本溢出省略号
  white-space: nowrap; // 强制将文字排列在一行，不进行换行
}
```

## 多行文本溢出(行数)
```scss
.container {
  width: 100px;
  border: 1px solid black;
  display: -webkit-box; // 结合 -webkit-line-clamp 使用, 将对象作为弹性伸缩盒子模型展示
  -webkit-box-orient: vertical; // 设置伸缩盒对象子元素的排列方式
  -webkit-line-clamp: 4; // 需要显示的行数
  overflow: hidden; // 溢出隐藏
  word-break: break-all; // 文本在超出容器宽度会在任意点进行断行，即使这样可能导致单词被分隔成两部分
  text-overflow: ellipsis; // 文本溢出显示省略号
}
```
- `-webkit-line-clamp` 属性只有 WebKit 内核的浏览器才支持
- 多适用于移动端页面，因为移动设备浏览器更多是基于 WebKit 内核

## 多行文本溢出(高度)
### 不显示省略号
```scss
.container {
  width: 200px;
  overflow: hidden;
  max-height: 40px;
  line-height: 20px;
}
```
### 伪元素 + 定位实现多行省略
```scss
.container {
  position: relative;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
  &::after {
    content: '...';
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 20px 0 10px;
  }
}
```
- 缺点: 省略号长显

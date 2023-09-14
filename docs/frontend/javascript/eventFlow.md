# 事件流
事件发生的顺序

```html
<div id="out">
  <p id="inner">click me!</p>
</div>
```
- 假设给 p 和 div 标签都绑定了点击事件

## 事件捕获
从最外层开始发生, 直到具体的元素

触发的顺序为 `document -> html -> body -> div -> p`

## 事件冒泡
> 把一颗石头投入水中, 泡泡会一直从水底冒出水面

事件从最底层的元素开始发生, 一直向上传播, 直到 document 对象

触发的顺序为 `p -> div -> body -> html -> document`

## EventTarget.addEventListener(event, fn, useCapture=false)
- event 事件名
- fn 回调函数
- useCapture
  - true 事件句柄在捕获阶段执行
  - false 事件句柄在冒泡阶段执行

## 事件代理
利用事件冒泡的原理，只需给外层的父容器添加事件，内层的子元素有点击事件，则会冒泡到父容器上。子元素委托它的父元素执行事件。
```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
<script>
  const ul = document.querySelector("ul")
  ul.addEventListener('click', function (e) {
    console.log(e.target.innerHTML)
  }, false)
</script>
```


## 阻止
### 阻止事件传播(捕获|冒泡)
- e.stopPropagation()
- e.cancelBubble = true (ie)
### 阻止默认行为
- e.preventDefault()
- e.returnValue = false (ie)
- @click.prevent = xxx (vue)

## 不支持冒泡的事件
~~妈妈不让我浪费~~
- mouseenter
- mouseleave
- blur
- resize
- load
- unload
- focus
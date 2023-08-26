# getComputedStyle

getComputedStyle() 方法用于获取指定元素的 CSS 样式, 获取的样式是元素在浏览器中最终渲染效果的样式。

## 定义
```js
window.getComputedStyle(element, pseudoElement)
```

- element
  - 用于获取计算样式的Element。

- pseudoElt 可选
  - 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。



## getComputedStyle 和 element.style

- 相同点
  - 返回的都是 CSSStyleDeclaration 对象
  - 取相应属性值得时候都是采用的 CSS 驼峰式写法
  - 均需要注意 float 属性。

- 不同点：
  - element.style 读取的只是元素的内联样式，即写在元素的 style 属性上的样式；而 getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式。
  - element.style 既支持读也支持写，我们通过 element.style 即可改写元素的样式。而 getComputedStyle 仅支持读并不支持写入。

我们可以通过使用 `getComputedStyle` 读取样式，通过 `element.style` 修改样式。



:::tip 参考
[Window getComputedStyle() 方法](https://www.runoob.com/jsref/jsref-getcomputedstyle.html)
:::
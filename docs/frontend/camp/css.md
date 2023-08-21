# 深入理解 CSS

## 一、认识
### 什么是 CSS
- Cascading Style Sheets
- 用来定义页面元素的样式
  - 设置字体和颜色
  - 设置位置和大小
  - 添加动画效果
### CSS结构
```css
h1 {
  color: white;
  font-size: 14px;
}
```
- 选择器 Selector: h1
- 选择器 Property: color
- 属性值 Value: white
- 声明 Declaration: font-size: 14px;
### 使用 CSS
1. 外链
```html
<link ref="stylesheet" href="/assets/style.css"> 
```
2. 嵌入
```html
<script>
  li { margin: 0; list-style: none; }
  p { margin: 1em 0; }
</script>
```
3. 内联
```html
<p style="margin: 1em 0">Example Content</p>
```
### CSS 如何工作
![](./assets/css-01.jpg)

## 二、选择器 Selector
- 找出页面中的元素, 以便给他们设置样式
- 使用多种方式选择元素
  - 按照标签名、类名或 id
  - 按照属性
  - 按照 DOM 树中的位置

### 分类
- 通配选择器
- 标签选择器
- id 选择器
- 类选择器
- 属性选择器
- 伪类
  - 不基于标签和属性定位元素
  - 状态伪类
  - 结构性伪类
- 组合

|    名称    | 语法  |            说明             |    示例     |
| :--------: | :---: | :-------------------------: | :---------: |
|  直接组合  |  AB   |       满足A同时满足B        | input:focus |
|  后代组合  |  A B  |   选中B, 如果它是A的子孙    |    nav a    |
|  亲子组合  | A > B |  选中B, 如果它是A的子元素   | section >p  |
| 兄弟选择器 | A ~ B | 选中B, 如果它在A后且和A同级 |   h2 ~ p    |
| 相邻选择器 | A + B |  选中A, 如果它紧跟在A后面   |   h2 + p    |

## 三、样式
### 颜色 RGB
- HSL
- Hue: 色相(H)是色彩的基本属性, 如红色、黄色等; 取值范围是0-360
- Saturation: 饱和度(S)是指色彩的鲜艳程度, 越高越鲜艳; 取值范围是0-100%
- Lightness: 亮度(L)是指颜色的明亮程度; 越高颜色越亮; 取值范围为0-100%

### 透明度 alpha
### 字体 font-family
- 字体列表最后写上通用字体族
- 英文字体放在中文字前面
### font-size
- 关键字
  - small、medium、large
- 长度
  - px、em
- 百分数
  - 相对于父元素字体大小
### line-height
### text-align
### spacing
### text-indent
### text-decoration
### white-space
## 四、调试 CSS
- 右键点击页面, 选择检查
- 使用快捷键
  - Ctrl + Shift + I (window)
  - Cmd + Opt + I (Mac)

## 五、选择器的特异度(Specificity)
## 六、继承
某些属性会自动继承其父元素的计算值, 除非显式指定一个值
### 显式继承
```css
* {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

.some-widget {
  box-sizing: content-box;
}
```
### 初始值
- CSS 中, 每个属性都有一个初始值
  - background-color 的初始值为 transparent
  - margin-left 的初始值为 0
- 可以使用 initial 关键字显式重置为初始值
  - background-color: initial 

## 七、布局
- 确定内容的大小和位置的算法
- 依据元素、容器、兄弟节点和内容等信息来计算
### 常规流
- 行级
- 块级
- 表格布局
- FlexBox
- Grid 布局
### Width
- 指定 content box 宽度
- 取值为长度、百分数、 auto
- auto 由浏览器根据其他属性确定
- 百分数相对于容器的 Content box 宽度
### Height
- 指定 content box 高度
- 取值为长度、百分数、auto
- auto 取值由内容计算得来
- 百分数相对于容器的 Content box 高度
- 容器有指定的高度时, 百分数才生效
### padding
- 指定元素四个方向的内边距
- 百分数相对于容器宽度
### border
- 指定容器边框样式、粗细和颜色
- 三种属性
  - border-width
  - border-style
  - border-color
- 四个方向
  - border-top
  - border-right
  - border-bottom
  - border-left
### margin
- 指定元素四个方向的外边距
- 取值可以是长度、百分数、auto
- 百分数相对于容器宽度
- margin: auto 水平居中
- margin collapse
### box-sizing: border-box
### overflow
### 块级 vs 行级
|   Block Level Box    |            Inline Level Box            |
| :------------------: | :------------------------------------: |
| 不和其他盒子并列摆放 | 和其他行级盒子一起放在一行或拆开成多行 |
| 适用所有的盒模型属性 |      盒模型的width、height不适用       |


|                       块级盒子                       |                   行级元素                   |
| :--------------------------------------------------: | :------------------------------------------: |
|                     生成块级盒子                     | 生成行级盒子、内容分散在多个行盒(line box)中 |
| body、article、div、main、section、h1-6、p、ul、li等 |        span、em、strong、cite、code等        |
|                    display:block                     |                display:inline                |

### display
- block 块级盒子
- inline 行级盒子
- inline-block 本身是行级, 可以放在行盒中; 可以设置宽高; 作为一个整体不会被拆散成多行
- none 排版时完全被忽略
### 常规流 Normal Flow
- 根元素、浮动和绝对定位的元素会脱离标准流
- 其他元素都在常规流之内(in-flow)
- 常规流中的盒子, 在某种排版上下文中参与布局
#### 行级排版上下文 
- Inline Formatting Context (IFC)
- **只包含行级盒子**的容器会创建一个 IFC
- IFC 内的排版规则
  - 盒子在一行内水平摆放
  - 一行放不下时, 换行显示
  - text-align 决定一行内盒子的水平对齐
  - vertical-align 决定一个盒子在行内的垂直对齐
  - 避开浮动元素
#### 块级排版上下文
- Block Formatting Context (BFC)
- 某些容器会创建一个 BFC
  - 根元素
  - 浮动、绝对定位、inline-block
  - Flex 子项和 Grid 子项
  - overflow 值不是 visible 的块盒
  - display: flow-root;
- BFC 排版规则
  - 盒子从上到下摆放
  - 垂直 margin 合并
  - BFC 内盒子的 margin 不会与外面合并
  - BFC 不会和浮动元素重叠
#### Flex Box
- 一种新的排版上下文
- 它可以控制子级盒子:
  - 摆放流向
  - 摆放顺序
  - 盒子宽度和高度
  - 水平和垂直方向对齐
  - 是否允许折行
#### Grid
- display: grid 使元素生成一个块级的 Grid 容器
- 使用 grid-template 相关属性将容器划分为网格
- 设置每一个子项占哪些行/列
- 划分网格
- grid line 网格线
- grid area 网格区域
## 八、Float 浮动
## 九、position 属性
- static 默认值, 非定位元素
- relative 相对自身原本位置偏移, 不脱离文档流
  - 在常规流里面布局
  - 相对于自己本应该在的位置进行偏移
  - 使用 top、left、bottom、right 设置偏移长度
  - 流内其他元素当它没有偏移一样布局
- absolute 绝对定位, 相对非 static 祖先元素定位
  - 脱离常规流
  - 相对于**最近的非static祖先**定位
  - 不会对流内元素布局造成影响
- fixed 相对于视口绝对定位
# 前端与 HTML
:::tip 来源
字节跳动前端青训营
:::

## 一、什么是前端
使用`WEB`技术栈解决多端(PC/移动浏览器、客户端/小程序等)图形用户页面交互的问题。

## 二、关注点
- 功能
- 性能
- 美观
- 安全
- 无障碍
- 兼容
- 体验

## 三、HTML 语法
- 标签和属性不区分大小写, 推荐小写
- 空标签可以不闭合, 比如`input`、`meta`
- 属性值推荐用`双引号`包裹
- 某些属性值可以省略, 比如`required`、`readonly`

## 四、标签语义化
1. `HTML`中的元素、属性及属性值都拥有某些含义
2. 开发者应该遵循语义来编写`HTML`
   - 有序列表用`ol`; 无序列表用`ul`
   - `lang` 属性表示内容所使用的语言

### 1. 谁在使用我们写的HTML
- 开发者: 修改、维护页面
- 浏览器: 展示页面
- 搜索引擎: 提取关键字、排序
- 屏幕阅读器: 给盲人读页面内容

### 2. 语义化好处
- 代码可读性
- 可维护性
- 搜索引擎优化
- 提升无障碍性

### 3. 如何做到语义化
- 了解每个标签和属性的含义
- 思考什么标签最适合描述这个内容
- 不使用可视化工具生成代码

### 4. 常见语义化标签
```html
<header></header> 头部
<nav></nav> 导航栏
<section></section> 区块
<main></main> 主要区域
<article></article> 主要内容
<aside></aside> 侧边栏
<footer></footer> 底部
```

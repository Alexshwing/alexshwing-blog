# `footer`固定在底部
```vue
<template>
  <div class="app-container">
   <header style="background: red">head</header>
   <main style="background: green">main</main>
   <footer style="background: pink">footer</footer>
  </div>
</template>
```
## 1. 绝对定位
`app-container`设置`box-sizing: border-box;`避免高度溢出, 同时设置`padding-bottom`给`footer`预留高度, `footer`通过绝对定位固定在底部
```scss
$ft-h: 60px;
.app-container {
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: $ft-h;
  header, main, footer {
    height: 60px;
    line-height: 60px;
    width: 100%;
  }
  footer {
    height: $ft-h;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
```
## 2. `flex`
`app-container`采用`flex`布局后, `main`设置`flex: 1`填充剩余区域
```scss
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1
  }
  header, footer {
    height: 60px;
    width: 100%;
  }
}
```
## 3. `calc`
```scss
.app-container {
  main {
    min-height: calc(100vh - 60px - 60px);
  }
  header, footer {
    height: 60px;
    width: 100%;
  }
}
```
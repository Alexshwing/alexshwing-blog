# 水平垂直居中

## 已知宽高
```html
<style>
  .fa {
    width: 100vw;
    height: 100vh;
  }

  .son {
    width: 40vmin;
    height: 40vmin;
    background-color: pink;
  }
</style>

<body>
  <div class="fa">
    <div class="son">123</div>
  </div>
</body>
```
### flex变异布局

flex 格式化上下文中, 设置 margin: auto的元素, 在通过 justify-content 和 align-self 进行对齐之前, 任何正处于空闲空间都会分配该方向的自动 margin 中去

这里，很重要的一点是，margin auto 的生效不仅是水平方向，垂直方向也会自动去分配这个剩余空间
```css
.fa {
  display: flex;
}

.son {
  margin: auto;
}
```
### 定位 + margin: auto
父级设置为相对定位，子级绝对定位 ，并且四个定位属性的值都设置了0，那么这时候如果子级没有设置宽高，则会被拉开到和父级一样宽高

这里子元素设置了宽高，所以宽高会按照我们的设置来显示，但是实际上子级的虚拟占位已经撑满了整个父级，这时候再给它一个margin：auto它就可以上下左右都居中了
```css
.fa {
  position: relative;
}

.son {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

## 未知宽高
```html
<style>
  .fa {
    width: 100vw;
    height: 100vh;
  }

  .son {
    background-color: pink;
  }
</style>

<body>
  <div class="fa">
    <div class="son">123</div>
  </div>
</body>
```
### 定位 + transform
```css
.fa {
  position: relative;
}

.son {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### flex
```css
.fa {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
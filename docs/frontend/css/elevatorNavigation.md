# 电梯导航
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #box1,
    #box2,
    #box3 {
      width: 80vw;
      height: 800px;
    }

    #box1 {
      background-color: pink;
    }

    #box2 {
      background-color: green;
    }

    #box3 {
      background-color: orange;
    }

    .slidebar {
      display: flex;
      flex-direction: column;
      margin-left: 85vw;
      margin-top: 50px;
      position: fixed;

    }

    .slidebar a {
      text-align: center;
      width: 50px;
      height: 50px;
      font-size: 10px;
    }

    .slidebar a:nth-child(1) {

      background-color: pink;
    }

    .slidebar a:nth-child(2) {

      background-color: green;
    }

    .slidebar a:nth-child(3) {
      background-color: orange;
    }

    html {
      /* 页面滚动条滑动 */
      scroll-behavior: smooth;
    }
  </style>
</head>

<body>
  <div style="display: flex">
    <div class="container">
      <div id="box1">服饰</div>
      <div id="box2">家电</div>
      <div id="box3">生鲜</div>
    </div>
    <div class="slidebar">
      <a href="#box1">服饰</a>
      <a href="#box2">家电</a>
      <a href="#box3">生鲜</a>
    </div>
  </div>

</body>

</html>
```
# 开始使用

采用 script 标签导入方式
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <svg width="1800" height="920" id="mainsvg" class="svgs"></svg>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script>
    const svg = d3.select("#mainsvg")
    const width = svg.attr("width"), height = svg.attr("height")
    console.log(width, height)
  </script>
</body>

</html>
```
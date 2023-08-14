# 读取文件
这个模块基于Fetch之上添加了解析功能
```js
d3.csv("/path/to/file.csv").then(function(data) {
  console.log(data); 
});
```
- d3.blob(input[, init]): 从指定的 input URL 以 Blob 的形式获取二进制文件
- d3.buffer(input[, init]): 从指定的 input URL 以 ArrayBuffer 的形式获取二进制文件
- d3.csv(input[, init][, row]): 等价于以逗号作为分隔符的 d3.dsv
- d3.dsv(delimiter, input[, init][, row]): 从指定的 input URL 获取 DSV 文件
- d3.html(input[, init]): 从指定的 input URL 以 text 获取文件然后 parses it(将其转换为) HTML
- d3.image(input[, init]): 从指定的 input URL 获取图片
- d3.json(input[, init])： 从指定的 input URL 获取 JSON 文件
- d3.svg(input[, init]): 从指定的 input URL 获取以text 获取文件然后 parses it(将其转换) 为 SVG
- d3.text(input[, init]): 从指定的 input URL 获取 text 文件
- d3.tsv(input[, init][, row]): 等价于以 tab 字符作为分隔符的 d3.dsv。
- d3.xml(input[, init]): 从指定的 input URL 获取以text 获取文件然后 parses it(将其转换) 为 XML
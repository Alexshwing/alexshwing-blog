# 坐标轴

## API
- d3.axisTop(scale): 使用给定的 scale 构建一个刻度在上的坐标轴生成器
- d3.axisRight(scale): 使用给定的 scale 构建一个刻度在右的坐标轴生成器
- d3.axisBottom(scale)：使用给定的 scale 构建一个刻度在下的坐标轴生成器,
- d3.axisLeft(scale): 使用给定的 scale 构建一个刻度在左的坐标轴生成器
- axis(context): 将坐标轴渲染到指定的 context
- axis.scale([scale]): 如果指定了 scale 则设置坐标轴的 scale，如果没有指定 scale 则返回当前坐标轴所使用的比例尺。

## 绘制坐标轴
- 绘制 svg
- 绘制比例尺
- 引入坐标轴
- 配置坐标轴
```js
const svg = d3.select('#mainsvg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = {top: 60, right: 30, bottom: 60, left: 150};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// 绘制 svg
const g = svg.append('g').attr("id", 'maingroup').attr('transform', `translate(${margin.left}, ${margin.top})`);

// 绘制比例尺
const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, innerWidth])

// 引入坐标轴
const yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, innerHeight])

const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale);

// 配置坐标轴
g.append('g').call(xAxis).attr("transform", `translate(0, ${innerHeight})`)
g.append('g').call(yAxis)
```

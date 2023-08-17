# 柱形图
```html
<!DOCTYPE html>
<html lang="en">

<body>
  <svg width="1600" height="920" id="mainsvg" class="svgs"></svg>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script>
    const data = [{name: 'Shao-Kui', value: 6},
    {name: 'Wen-Yang', value: 6}, {name: 'Cai Yun', value: 16}, {name: 'Liang Yuan', value: 10},
    {name: 'Yuan-Chen', value: 6}, {name: 'Rui-Long', value: 10}, {name: 'Dong Xin', value: 12},
    {name: 'He Yu', value: 20}, {name: 'Xiang-Li', value: 12}, {name: 'Godness', value: 20},
    {name: 'Wei-Yu', value: 15}, {name: 'Chen Zheng', value: 14},
    {name: 'Yu Peng', value: 15}, {name: 'Li Jian', value: 18}];

    const svg = d3.select("#mainsvg")
    const width = +svg.attr("width")
    const height = +svg.attr("height")
    const margin = {top: 60, right: 30, bottom: 60, left: 150}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const xValue = d => d.value
    const yValue = d => d.name

    function render(data) {
      // 绘制svg
      const g = svg.append('g')
        .attr("id", "maringroup")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

      // 绘制比例尺
      const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, xValue)])
        .range([0, innerWidth])
      const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.1)

      // 引入坐标轴
      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      // 配置坐标轴
      g.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`);
      g.append('g').call(yAxis)

      // 绘制矩形
      g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => yScale(yValue(d)))
        .attr("width", d => xScale(xValue(d)))
        .attr("height", yScale.bandwidth())
        .attr("fill", "green")

      // 修改文字大小
      d3.selectAll(".tick text")
        .attr("font-size", "20px")

      // 添加标题
      g.append("text")
        .text("Member of CSCG")
        .attr("font-size", "3em")
        .attr("x", innerWidth / 2 - 200)
        .attr("y", -10)
    }

    render(data)

  </script>
</body>

</html>
```

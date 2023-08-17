# 折线图
```html
<!DOCTYPE html>
<html lang="en">

<body>
  <svg width="1600" height="800" id="mainsvg" class="svgs"></svg>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script>
    const svg = d3.select("#mainsvg")
    const width = +svg.attr("width")
    const height = +svg.attr("height")
    const margin = {top: 120, right: 50, bottom: 50, left: 120}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const g = svg.append("g")
      .attr("id", "maingroup")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
    const xValue = d => d['日期']
    const yValue = d => d['现有确诊']
    let xScale, yScale
    let alldates
    let allkeys

    const render_init = function (data) {
      xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice()

      yScale = d3.scaleLinear()
        .domain([d3.max(data, yValue), d3.min(data, yValue)])
        .range([0, innerHeight])
        .nice()

      const xAxis = d3.axisBottom(xScale)
        .ticks(Math.floor(alldates.length) / 4)
        .tickSize(-innerHeight)
      const xAxisGroup = g.append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)

      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
      const yAxisGroup = g.append("g").call(yAxis)

      g.selectAll(".tick text").attr("font-size", "2em")
      g.append("path").attr("id", "alterPath")

    }

    const render_update_alter = function (data) {
      const line = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveCardinal.tension(0.5)) // 曲线情况

      // 让第一条折线图平滑出现
      const lineEmpty = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(0))
        .curve(d3.curveCardinal.tension(0.5)) 

      const maingroup = d3.select('#maingroup');
      const pathupdate = maingroup.selectAll('.datacurve').data([data])
      const pathenter = pathupdate.enter()
        .append("path")
        .attr("class", "datacurve")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
        .attr("d", lineEmpty)

      pathupdate.merge(pathenter)
        .transition().duration(2000).ease(d3.easeLinear)
        .attr("d", line)
    }


    d3.csv("../province.csv").then(data => {
      data = data.filter(d => d["省份"] !== '总计' && d["省份"] !== '湖北')
      alldates = Array.from(new Set(data.map(d => xValue(d))))
      data.forEach(d => {
        d["现有确诊"] = +d["现有确诊"]
        d["日期"] = new Date(d["日期"])
      })
      let provinces = {}
      allkeys = Array.from(new Set(data.map(d => d["省份"])))
      allkeys.forEach(key => provinces[key] = [])
      data.forEach(d => provinces[d['省份']].push(d))
      allkeys.forEach(key => provinces[key].sort(function (a, b) {
        return new Date(b['日期']) - new Date(a['日期']);
      }))

      render_init(data)

      let c = 0
      let intervalId = setInterval(() => {
        if (c >= allkeys.length) {
          clearInterval(intervalId)
        } else {
          let key = allkeys[c]
          render_update_alter(provinces[key])
          c = c + 1
        }
      }, 2000)
    })
  </script>
</body>

</html>
```
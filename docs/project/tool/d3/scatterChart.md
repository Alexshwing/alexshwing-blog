# 散点图

```html
<!DOCTYPE html>
<html lang="en">

<body>
  <svg width="1600" height="920" id="mainsvg" class="svgs"></svg>
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script>
    const svg = d3.select('#mainsvg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {top: 100, right: 120, bottom: 100, left: 120};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    let xScale, yScale;
    const xAxisLabel = '累计确诊人数（对数）';
    const yAxisLabel = '新增人数（对数）';
    let alldates;
    let sequantial;
    let aduration = 1000;
    let xValue = d => Math.log(d['确诊人数'] + 1);
    let yValue = d => Math.log(d['新增确诊'] + 1);


    var color = {
      "武汉": "#ff1c12",
      "黄石": "#de5991",
      "十堰": "#759AA0",
      "荆州": "#E69D87",
      "宜昌": "#be3259",
      "襄阳": "#EA7E53",
      "鄂州": "#EEDD78",
      "荆门": "#9359b1",
      "孝感": "#47c0d4",
      "黄冈": "#F49F42",
      "咸宁": "#AA312C",
      "恩施州": "#B35E45",
      "随州": "#4B8E6F",
      "仙桃": "#ff8603",
      "天门": "#ffde1d",
      "潜江": "#1e9d95",
      "神农架": "#7289AB"
    }

    const renderinit = function (data) {
      xScale = d3.scaleLinear()
        .domain([d3.min(data, xValue), d3.max(data, xValue)])
        .range([0, innerWidth])
        .nice();

      yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue).reverse())
        .range([0, innerHeight])
        .nice();

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', 'maingroup');

      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
      const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(10);

      let yAxisGroup = g.append('g').call(yAxis)
        .attr('id', 'yaxis');
      yAxisGroup.append('text')
        .attr('font-size', '2em')
        .attr('transform', `rotate(-90)`)
        .attr('x', -innerHeight / 2)
        .attr('y', -60)
        .attr('fill', '#333333')
        .text(yAxisLabel)
        .attr('text-anchor', 'middle')
      yAxisGroup.selectAll('.domain').remove();

      let xAxisGroup = g.append('g').call(xAxis)
        .attr('transform', `translate(${0}, ${innerHeight})`)
        .attr('id', 'xaxis');
      xAxisGroup.append('text')
        .attr('font-size', '2em')
        .attr('y', 60)
        .attr('x', innerWidth / 2)
        .attr('fill', '#333333')
        .text(xAxisLabel);
      xAxisGroup.selectAll('.domain').remove();
    };

    const renderUpdate = function (seq) {
      const g = d3.select('#maingroup');

      let circleupdates = g.selectAll('circle').data(seq, d => d['地区']);

      let circleenter = circleupdates.enter().append('circle')
        .attr('cx', d => xScale(xValue(d)))
        .attr('cy', d => yScale(yValue(d)))
        .attr('r', 10)
        .attr('fill', d => color[d['地区']])
        .attr('opacity', 0.8)

      circleupdates.merge(circleenter)
        .transition().ease(d3.easeLinear).duration(aduration)
        .attr('cx', d => xScale(xValue(d)))
        .attr('cy', d => yScale(yValue(d)));
    }


    d3.csv("../hubeinxt.csv").then(data => {
      data = data.filter(d => d['地区'] !== '总计');
      data.forEach(d => {
        d['确诊人数'] = +(d['确诊人数']);
        d['新增确诊'] = +(d['新增确诊']);
        if (d['新增确诊'] < 0) {
          d['新增确诊'] = 0;
        }
      });

      alldates = Array.from(new Set(data.map(d => d['日期'])));

      alldates = alldates.sort((a, b) => {
        return new Date(a) - new Date(b);
      });

      sequantial = [];
      alldates.forEach(d => {
        sequantial.push([])
      });
      data.forEach(d => {
        sequantial[alldates.indexOf(d['日期'])].push(d);
      });
      renderinit(data);

      let c = 0;
      let intervalId = setInterval(() => {
        if (c >= alldates.length) {
          clearInterval(intervalId);
        } else {
          renderUpdate(sequantial[c]);
          c = c + 1;
        }
      }, aduration)

    })

  </script>
</body>

</html>
```
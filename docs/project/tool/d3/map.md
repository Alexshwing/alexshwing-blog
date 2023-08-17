# 地图
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="/css/earth.css">
  <link rel="stylesheet" href="/css/d3tip.css">
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
  <script src="/js/topojson.js"></script>
</head>

<body>
  <svg width="1600" height="800" id="mainsvg" class="svgs"></svg>

  <script>
    const svg = d3.select("svg")
    const width = +svg.attr("width")
    const height = +svg.attr("height")
    const margin = {top: 60, right: 60, bottom: 10, left: 60}
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const g = svg.append('g').attr("id", "maingroup")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // convert dataPath to svgPath; 
    // go to https://github.com/d3/d3-geo for more different projections; 
    const projection = d3.geoNaturalEarth1()
    const pathGenerator = d3.geoPath().projection(projection)


    let worldmeta
    let lastid = undefined
    d3.json('../countries-110m.json').then(res => {
      // convert topo-json to geo-json; 
      worldmeta = topojson.feature(res, res.objects.countries)

      // this code is really important if you want to fit your geoPaths (map) in your SVG element; 
      projection.fitSize([innerWidth, innerHeight], worldmeta);


      const paths = g.selectAll("path")
        .data(worldmeta.features, d => d.properties.name)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .on("mouseover", function (d) {
          d3.select(this)
            .attr("opacity", 0.5)
            .attr("stroke", "white")
            .attr("stroke-width", 6)
        })
        .on("mouseout", function (d) {
          d3.select(this)
            .attr("opacity", 1)
            .attr("stroke", "black")
            .attr("stroke-width", 1);
        })
    })
  </script>
</body>

</html>
```
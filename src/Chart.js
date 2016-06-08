import d3 from 'd3';

export default {
  create(el, data, isMain){
    var width = el.clientWidth;
    var height = el.clientHeight;
    var count = data.length;
    var barWidth = width/count;
    var barColor = 'rgba(25, 183, 226, 0.1)';
    var barBorderColor = '#01afde';
    var meanColor = '#ff5454';
    var meanY = d3.mean(data, d => {
      return d.y
    });
    var meanValue = meanY < 10 ? Number(meanY.toFixed(2)) : Math.round(meanY);

    var svg = d3.select(el).append('svg')
      .attr('style', 'shape-rendering: crispEdges;')
      .attr('width', width)
      .attr('height', height);

    var x = d3.time.scale()
      .domain([+data[0].x, +data[data.length - 1].x])
      .range([0, width]);

    var y = d3.scale.linear()
      .domain([0, d3.max(data, d => {
        return +d.y
      })])
      .range([0, height]);



    var bar = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g');


    if (isMain) {
      var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(0)
        .ticks(d3.time.days)
        .orient('bottom');

      var yAxis = d3.svg.axis()
        .scale(y)
        .tickSize(width)
        .tickFormat(d3.format(''))
        .orient('right');

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height-20})`)
        .call(xAxis);

      var gy = svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

      gy.selectAll('g').filter(d => { return d})
        .classed('minor', true);

      gy.selectAll('g').filter(d => { return !d})
        .classed('hidden', true);

      // gy.selectAll('text')
      //   .attr('font-family', 'helvetica')
      //   .attr('font-size', 10)
      //   .attr('fill', '#a6a6a6')
      //   .attr('x', 4)
      //   .attr('dy', -4);
    }

    bar.attr('class', 'chart-bar')
      .append('rect')
      .attr('class', 'bar-body')
      .attr('width', barWidth)
      .attr('height', d => {
        return y(d.y)
      })
      .attr('x', (d,i) => {
        return i*barWidth
      })
      .attr('y', d => {
        return height-y(d.y)
      })
      .attr('fill', barColor);


    bar.append('rect')
      .attr('class', 'bar-border')
      .attr('width', barWidth)
      .attr('height', 2)
      .attr('x', (d,i) => {
        return i * barWidth
      })
      .attr('y', d => {
        return height-y(d.y)
      })
      .attr('fill', barBorderColor);


    if (isMain) {
      var meanLine = svg.append('g');

      meanLine.append('line')
        .attr('class', 'mean-line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', height - y(meanY))
        .attr('y2', height - y(meanY))
        .attr('stroke', meanColor)
        .attr('stroke-width', 1);

      var meanLineCounter = meanLine.append('g');

      meanLineCounter.append('rect')
        .attr('class', 'mean-counter')
        .attr('width', 60)
        .attr('height', 18)
        // .attr('rx', 2)
        .attr('x', (width-60)/2)
        .attr('y', height - y(meanY) - 9)
        .attr('fill', meanColor);

      meanLineCounter.append('text')
        .attr('class', 'mean-text')
        .attr('x', width/2)
        .attr('y', height - y(meanY) + 3)
        .attr('text-anchor', 'middle')
        .text(meanValue)
        .attr('font-family', 'helvetica')
        .attr('font-size', 10)
        .attr('fill', '#fff');
    }
  },

  update(el, data){
    console.warn('update');
    var width = el.clientWidth;
    var height = el.clientHeight;
    var count = data.length;
    var barWidth = width/count;
    var barColor = 'rgba(25, 183, 226, 0.1)';
    var barBorderColor = '#01afde';
    var meanColor = '#ff5454';
    var meanY = d3.mean(data, d => {
      return d.y
    });
    var meanValue = meanY < 10 ? Number(meanY.toFixed(2)) : Math.round(meanY);
    var duration = 400;

    var y = d3.scale.linear()
      .domain([0, d3.max(data, d => {
        return +d.y
      })])
      .range([0, height]);

    // var yAxis = d3.svg.axis()
    //   .scale(y)
    //   .tickSize(width)
    //   .tickFormat(d3.format(''))
    //   .orient('right');
    //
    // var gy = d3.select('.y.axis');
    // gy
    //   .transition()
    //   .duration(duration)
    //   .call(yAxis);

    // gy.selectAll('g').filter(d => { return d})
    //   .classed('minor', true);
    //
    // gy.selectAll('g').filter(d => { return !d})
    //   .classed('hidden', true);
    //
    // gy.selectAll('text')
    //   .attr('font-family', 'helvetica')
    //   .attr('font-size', 10)
    //   .attr('fill', '#a6a6a6')
    //   .attr('x', 4)
    //   .attr('dy', -4);



    d3.select(el).selectAll('rect.bar-body')
      .data(data)
      .transition()
      .duration(duration)
      .attr('height', d => {
        return y(d.y)
      })
      .attr('y', d => {
        return height-y(d.y)
      });

    d3.select(el).selectAll('rect.bar-border')
      .data(data)
      .transition()
      .duration(duration)
      .attr('y', d => {
        return height-y(d.y)
      });

    d3.select(el).selectAll('line.mean-line')
      .data(data)
      .transition()
      .duration(duration)
      .attr('y1', height - y(meanY))
      .attr('y2', height - y(meanY));


    d3.select(el).selectAll('rect.mean-counter')
      .data(data)
      .transition()
      .duration(duration)
      .attr('y', height - y(meanY) - 9);

    d3.select(el).selectAll('text.mean-text')
      .data(data)
      .transition()
      .duration(duration)
      .attr('y', height - y(meanY) + 3)
      .text(meanValue);
  },
  remove(){
    console.warn('remove!');
  }
}

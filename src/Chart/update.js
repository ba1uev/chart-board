import d3 from 'd3';

export default function update(el, data, isMain){
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

  // if (isMain) {
  //   var tooltip = d3.select('.chart-tooltip');
  // }


  var bars = d3.select(el).selectAll('rect.bar-body')
    .data(data);

    bars
    .transition()
    .duration(duration)
    .attr('height', d => {
      return y(d.y)
    })
    .attr('y', d => {
      return height-y(d.y)
    })
    // .on('mousemove', showTooltip)
    // .on('mouseover', hideTooltip);

    if (isMain) {
      // tooltip.html(`=))<br/>ЧИсло: ${d.y}`);
      // bar.on('mousemove', d => {
      //   tooltip
      //     // .transition()
      //     // .duration(150)
      //     .style('opacity', 1);
      //   tooltip.html(`=))<br/>ЧИсло: ${d.y}`)
      //     .style('left', (d3.event.pageX-50)+"px")
      //     .style('top', (d3.event.pageY+10)+"px");
      // })
      // bar.on('mouseout', d => {
      //   tooltip
      //     // .transition()
      //     // .duration(150)
      //     .style('opacity', 0);
      // })
    }

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
}

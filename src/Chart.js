import d3 from 'd3';

export default {
  create(el, data, type){
    var width = el.clientWidth;
    var height = el.clientHeight;
    var count = data.length;
    var barWidth = width/count;
    var barColor = 'rgba(25, 183, 226, 0.1)';
    var barBorderColor = '#01afde';
    var meanColor = '#ff5454';
    var meanY = d3.mean(data, d => {
      return d.y
    })

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

    var bar = svg.selectAll('rect')
      .data(data)
      .enter()
      .append('g');


    bar.attr('class', 'chart-bar')
      .append('rect')
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
      .attr('width', barWidth)
      .attr('height', 2)
      .attr('x', (d,i) => {
        return i * barWidth
      })
      .attr('y', d => {
        return height-y(d.y)
      })
      .attr('fill', barBorderColor);

    var meanLine = svg.append('g');

    meanLine.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', height - y(meanY))
      .attr('y2', height - y(meanY))
      .attr('stroke', meanColor)
      .attr('stroke-width', 1);

    var meanLineCounter = meanLine.append('g');

    meanLineCounter.append('rect')
      .attr('width', 60)
      .attr('height', 18)
      // .attr('rx', 2)
      .attr('x', (width-60)/2)
      .attr('y', height - y(meanY) - 9)
      .attr('fill', meanColor);

    meanLineCounter.append('text')
      .attr('x', width/2)
      .attr('y', height - y(meanY) + 3)
      .attr('text-anchor', 'middle')
      .text(Math.round(meanY))
      .attr('font-family', 'helvetica')
      .attr('font-size', 10)
      .attr('fill', '#fff')
  },







  update(){
    console.warn('update!');
  },
  remove(){
    console.warn('remove!');
  }
}

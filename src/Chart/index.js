import d3 from 'd3';
// import moment from 'moment';
import create from './create';
import update from './update.js';

// moment.locale('ru');

function showTooltip(){
  // var tooltip = d3.select('body').append('div')
  //   .attr('class', 'chart-tooltip')
  //   .style('opacity', 0);
}

function hideTooltip(){
  console.log('hide THIS');
}

export default {
  create: create,
  update: update,
  remove(){
    console.warn('remove!');
  }
}

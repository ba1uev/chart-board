import React, { Component } from 'react';
import Chart from './Chart';
import {mean, sum} from 'lodash';

var indexList = ['shows', 'impressions', 'clicks', 'ctr'];
var uniqKey = Math.round(Math.random()*10000);

export default class App extends Component {
  state = {
    shows: null,
    impressions: null,
    clicks: null,
    ctr: null
  }

  // shouldComponentUpdate(nextProps, nextState){
    // console.log('PROPS > ', nextProps);
    // console.log('STATE > ', nextState);
    // return true
  // }

  componentDidMount(){
    let refs = this.refs;
    let mainIndex = this.props.index;
    let data = this.props.data;
    let values = {};
    Chart.create(refs['mainChart'], this.separateData(data, mainIndex), true);
    indexList.forEach(index => {
      let dataSet = this.separateData(data, index);
      let totalValue = 0;
      Chart.create(refs[index], dataSet, false);
      // FIXME : РАСКОМЕНТИТЬ !
      // dataSet.forEach(datum => {
      //   totalValue += datum.y;
      // })
      // values[index] = index === 'ctr' ? Number((totalValue/dataSet.length).toFixed(2)) : totalValue;
    })
    // this.setState({...values});
  }

  componentDidUpdate(){
    let refs = this.refs;
    let mainIndex = this.props.index;
    let data = this.props.data;
    Chart.update(refs['mainChart'], this.separateData(data, mainIndex), true);
    indexList.forEach(index => {
      Chart.update(refs[index], this.separateData(data, index), false);
    })
  }

  separateData(data, index) {
    let result = [];
    data.forEach((item,i) => {
      // if (i < 10) {
        result.push({
          x: item.ts,
          y: Number(item[index])
        })
      // }
    })
    return result
  }


  render(){
    let mainChartStyle = {
      height: '300px'
    }

    let subCharts = [];
    indexList.forEach(index => {
      subCharts.push(
        <div
          className='subChart'
          key={`${index}_${uniqKey}`}
          onClick={() => {this.props.subChartClickHandler.apply(null,[index])}}
        >
          <b style={{color: index===this.props.index ? 'red' : 'black'}}>{index}</b>
          <div
            style={{height: '100px'}}
            ref={index}>
          </div>
          <span>{this.state[index]}</span>
        </div>
      )
    })
    return (
      <div>
        <div style={mainChartStyle} ref="mainChart">
        </div>
        {/*<button onClick={() => {this.updateData(this)}}>Update</button>*/}
        <br/>
        <div>
          {subCharts}
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import Chart from './Chart';

export default class App extends Component {
  state = {
    data: this.prepareData(this.props.data)
  }

  componentDidMount(){
    console.error('MOUNT');
    let index = this.props.index;
    // let data = this.prepareData(this.props.data, index);
    let mainChart = this.refs.mainChart;
    // let subChart_1 = this.refs.subChart_1;
    // let params = {
    //   width: mainChart.clientWidth,
    //   height: mainChart.clientHeight,
    //   type: 'main'
    // };
    Chart.create(mainChart, this.state.data, 'main');
  }

  componentDidUpdate(){
    console.error('UPDATE');
    let mainChart = this.refs.mainChart;
    let data = this.state.data;
    // console.log(this.state.data[3].y);
    Chart.update(mainChart, data);
  }

  prepareData(data) {
    let result = [];
    data.forEach((item,i) => {
      if (i < 18) {
        result.push({
          x: new Date(item.ts),
          y: item.shows
        })
      }
    })
    return result
  }

  updateData(_this){
    // console.log(_this.state.data[3].y);
    let result = [];
    let data = _this.state.data;
    data.forEach(item => {
      result.push({
        x: item.x,
        y: Math.round(+item.y + Math.random()*2000)
      })
    })
    _this.setState({
      data: result
    })
  }

  render(){
    let mainChartStyle = {
      // border: '1px solid blue',
      height: '300px'
    }
    let subChartStyle = {
      width: '23%',
      margin: '20px 1% 0 0',
      border: '1px solid blue',
      display: 'inline-block',
      height: '100px',
      verticalAlign: 'top'
    }
    return (
      <div>
        <div style={mainChartStyle} ref="mainChart">
        </div>
        <button onClick={() => {this.updateData(this)}}>Update</button>
        <br/>
        <div>
          <div style={subChartStyle} ref="subChart_1">
          </div>
          <div style={subChartStyle} ref="subChart_2">
          </div>
          <div style={subChartStyle} ref="subChart_3">
          </div>
          <div style={subChartStyle} ref="subChart_4">
          </div>
        </div>
      </div>
    )
  }
}

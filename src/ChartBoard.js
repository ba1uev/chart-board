import React, { Component } from 'react';
import Chart from './Chart';

export default class App extends Component {
  state = {
    mainData: this.prepareData(this.props.data, this.props.index),
    subData_1: this.prepareData(this.props.data, 'clicks'),
    subData_2: this.prepareData(this.props.data, 'impressions'),
    subData_3: this.prepareData(this.props.data, 'shows'),
  }

  componentDidMount(){
    console.error('MOUNT');
    let mainChart = this.refs.mainChart;
    let subChart_1 = this.refs.subChart_1;
    let subChart_2 = this.refs.subChart_2;
    let subChart_3 = this.refs.subChart_3;
    Chart.create(mainChart, this.state.mainData, 'main');
    Chart.create(subChart_1, this.state.subData_1, 'sub');
    Chart.create(subChart_2, this.state.subData_2, 'sub');
    Chart.create(subChart_3, this.state.subData_3, 'sub');
  }

  componentDidUpdate(){
    console.error('UPDATE');
    let mainChart = this.refs.mainChart;
    let subChart_1 = this.refs.subChart_1;
    let subChart_2 = this.refs.subChart_2;
    let subChart_3 = this.refs.subChart_3;
    // let maindata = this.state.mainData;
    // console.log(this.state.data[3].y);
    Chart.update(mainChart, this.state.mainData);
    Chart.update(subChart_1, this.state.subData_1);
    Chart.update(subChart_2, this.state.subData_2);
    Chart.update(subChart_3, this.state.subData_3);
  }

  prepareData(data, index) {
    let result = [];
    data.forEach((item,i) => {
      // if (i < 18) {
        result.push({
          x: new Date(item.ts),
          y: item[index]
        })
      // }
    })
    return result
  }

  updateData(_this){
    // console.log(_this.state.data[3].y);
    var result = [];
    var data = _this.state.mainData;
    data.forEach((item,i) => {
      result.push({
        x: item.x,
        y: Math.round(+item.y + Math.random()*2000)
      })
    })
    _this.setState({
      mainData: result
    })

    result = [];
    data = _this.state.subData_1;
    data.forEach(item => {
      result.push({
        x: item.x,
        y: Math.round(+item.y + Math.random()*2000)
      })
    })
    _this.setState({
      subData_1: result
    })

    result = [];
    data = _this.state.subData_2;
    data.forEach(item => {
      result.push({
        x: item.x,
        y: Math.round(+item.y + Math.random()*2000)
      })
    })
    _this.setState({
      subData_2: result
    })

    result = [];
    data = _this.state.subData_3;
    data.forEach(item => {
      result.push({
        x: item.x,
        y: Math.round(+item.y + Math.random()*2000)
      })
    })
    _this.setState({
      subData_3: result
    })
  }

  render(){
    let mainChartStyle = {
      // border: '1px solid blue',
      height: '300px'
    }
    let subChartStyle = {
      width: '23%',
      margin: '20px 4% 0 0',
      // borderTop: '1px solid blue',
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

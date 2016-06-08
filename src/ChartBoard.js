import React, { Component } from 'react';
import Chart from './Chart';

var indexList = ['shows', 'impressions', 'clicks', 'ctr'];
var uniqKey = Math.round(Math.random()*10000);

export default class App extends Component {

  componentDidMount(){
    console.error('MOUNT');
    let refs = this.refs;
    let mainIndex = this.props.index;
    let data = this.props.data;
    Chart.create(refs['mainChart'], this.separateData(data, mainIndex), true);
    indexList.forEach(index => {
      Chart.create(refs[index], this.separateData(data, index), false);
    })
  }

  componentDidUpdate(){
    console.error('UPDATE');
    let refs = this.refs;
    let mainIndex = this.props.index;
    let data = this.props.data;
    Chart.update(refs['mainChart'], this.separateData(data, mainIndex));
    indexList.forEach(index => {
      Chart.update(refs[index], this.separateData(data, index));
    })

    // let mainChart = this.refs.mainChart;
    // let subChart_1 = this.refs.subChart_1;
    // let subChart_2 = this.refs.subChart_2;
    // let subChart_3 = this.refs.subChart_3;
    // // let maindata = this.state.mainData;
    // // console.log(this.state.data[3].y);
    // Chart.update(mainChart, this.state.mainData);
    // Chart.update(subChart_1, this.state.subData_1);
    // Chart.update(subChart_2, this.state.subData_2);
    // Chart.update(subChart_3, this.state.subData_3);
  }

  separateData(data, index) {
    let result = [];
    data.forEach((item,i) => {
      // if (i < 18) {
        result.push({
          x: item.ts,
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
      height: '300px'
    }

    let subChartStyle = {
      width: '21%',
      margin: '20px 2% 0 0',
      display: 'inline-block',
      border: '1px solid lightgray',
      padding: '5px',
      verticalAlign: 'top'
    }
    let subCharts = [];
    indexList.forEach(index => {
      subCharts.push(
        <div
          style={subChartStyle}
          key={`${index}_${uniqKey}`}
          onClick={() => {this.props.subChartClickHandler.apply(null,[index])}}
        >
          <b style={{color: index===this.props.index ? 'red' : 'black'}}>{index}</b>
          <div
            style={{height: '100px'}}
            ref={index}>
          </div>
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

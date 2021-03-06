import React, { Component } from 'react';
import ChartBoard from './ChartBoard'

var stat_data = JSON.parse('[{"ts":"2016-03-28T21:00:00+0300","clicks":"21","shows":"6479","impressions":"0"},{"ts":"2016-03-29T21:00:00+0300","clicks":"27","shows":"12966","impressions":"0"},{"ts":"2016-03-30T21:00:00+0300","clicks":"51","shows":"13220","impressions":"0"},{"ts":"2016-03-31T21:00:00+0300","clicks":"30","shows":"10478","impressions":"0"},{"ts":"2016-04-01T21:00:00+0300","clicks":"22","shows":"6952","impressions":"0"},{"ts":"2016-04-02T21:00:00+0300","clicks":"14","shows":"7570","impressions":"0"},{"ts":"2016-04-03T21:00:00+0300","clicks":"32","shows":"11448","impressions":"0"},{"ts":"2016-04-04T21:00:00+0300","clicks":"28","shows":"11017","impressions":"0"},{"ts":"2016-04-05T21:00:00+0300","clicks":"24","shows":"9819","impressions":"0"},{"ts":"2016-04-06T21:00:00+0300","clicks":"23","shows":"6974","impressions":"0"},{"ts":"2016-04-07T21:00:00+0300","clicks":"29","shows":"6524","impressions":"0"},{"ts":"2016-04-08T21:00:00+0300","clicks":"17","shows":"5181","impressions":"0"},{"ts":"2016-04-09T21:00:00+0300","clicks":"23","shows":"5430","impressions":"0"},{"ts":"2016-04-10T21:00:00+0300","clicks":"18","shows":"8772","impressions":"0"},{"ts":"2016-04-11T21:00:00+0300","clicks":"35","shows":"12394","impressions":"0"},{"ts":"2016-04-12T21:00:00+0300","clicks":"26","shows":"11867","impressions":"0"},{"ts":"2016-04-13T21:00:00+0300","clicks":"34","shows":"11623","impressions":"0"},{"ts":"2016-04-14T21:00:00+0300","clicks":"17","shows":"11914","impressions":"0"},{"ts":"2016-04-15T21:00:00+0300","clicks":"6","shows":"5263","impressions":"0"},{"ts":"2016-04-16T21:00:00+0300","clicks":"10","shows":"5642","impressions":"0"},{"ts":"2016-04-17T21:00:00+0300","clicks":"17","shows":"12856","impressions":"0"},{"ts":"2016-04-18T21:00:00+0300","clicks":"42","shows":"12031","impressions":"0"},{"ts":"2016-04-19T21:00:00+0300","clicks":"23","shows":"12171","impressions":"0"},{"ts":"2016-04-20T21:00:00+0300","clicks":"30","shows":"11559","impressions":"0"},{"ts":"2016-04-21T21:00:00+0300","clicks":"24","shows":"10974","impressions":"0"},{"ts":"2016-04-22T21:00:00+0300","clicks":"21","shows":"5198","impressions":"0"},{"ts":"2016-04-23T21:00:00+0300","clicks":"16","shows":"5690","impressions":"0"},{"ts":"2016-04-24T21:00:00+0300","clicks":"25","shows":"13101","impressions":"0"},{"ts":"2016-04-25T21:00:00+0300","clicks":"17","shows":"13123","impressions":"0"},{"ts":"2016-04-26T21:00:00+0300","clicks":"21","shows":"12127","impressions":"0"},{"ts":"2016-04-27T21:00:00+0300","clicks":"25","shows":"11947","impressions":"0"},{"ts":"2016-04-28T21:00:00+0300","clicks":"29","shows":"10251","impressions":"0"},{"ts":"2016-04-29T21:00:00+0300","clicks":"13","shows":"4208","impressions":"0"},{"ts":"2016-04-30T21:00:00+0300","clicks":"7","shows":"4308","impressions":"0"},{"ts":"2016-05-01T21:00:00+0300","clicks":"9","shows":"4153","impressions":"0"},{"ts":"2016-05-02T21:00:00+0300","clicks":"7","shows":"5147","impressions":"0"},{"ts":"2016-05-03T21:00:00+0300","clicks":"17","shows":"12100","impressions":"0"},{"ts":"2016-05-04T21:00:00+0300","clicks":"23","shows":"11805","impressions":"0"},{"ts":"2016-05-05T21:00:00+0300","clicks":"7","shows":"3244","impressions":"0"},{"ts":"2016-05-06T21:00:00+0300","clicks":"3","shows":"2522","impressions":"0"},{"ts":"2016-05-07T21:00:00+0300","clicks":"1","shows":"2499","impressions":"0"},{"ts":"2016-05-08T21:00:00+0300","clicks":"4","shows":"3311","impressions":"0"},{"ts":"2016-05-09T21:00:00+0300","clicks":"2","shows":"817","impressions":"0"},{"ts":"2016-05-14T21:00:00+0300","clicks":"4","shows":"2531","impressions":"2253"},{"ts":"2016-05-15T21:00:00+0300","clicks":"2","shows":"2998","impressions":"2705"},{"ts":"2016-05-16T21:00:00+0300","clicks":"2","shows":"3218","impressions":"2906"},{"ts":"2016-05-17T21:00:00+0300","clicks":"4","shows":"3328","impressions":"2976"},{"ts":"2016-05-18T21:00:00+0300","clicks":"4","shows":"3371","impressions":"3073"},{"ts":"2016-05-19T21:00:00+0300","clicks":"3","shows":"3096","impressions":"2779"},{"ts":"2016-05-20T21:00:00+0300","clicks":"5","shows":"2475","impressions":"2201"},{"ts":"2016-05-21T21:00:00+0300","clicks":"2","shows":"2714","impressions":"2385"},{"ts":"2016-05-22T21:00:00+0300","clicks":"4","shows":"3077","impressions":"2792"},{"ts":"2016-05-23T21:00:00+0300","clicks":"4","shows":"2668","impressions":"2414"}]');

export default class App extends Component {
  state = {
    index: 'shows'
  }

  calcCtr(shows, clicks) {
    return Number((Number.parseInt(clicks) * 100 / Number.parseInt(shows)).toFixed(2))
  }

  prepareData(data){
    let result = [];
    data.forEach(item => {
      result.push({
        ...item,
        ts: new Date(item.ts),
        ctr: this.calcCtr(item.shows, item.clicks)
      })
    });
    return result
  }

  subChartClickHandler(index) {
    this.setState({
      index: index
    })
  }

  render() {
    let rootStyle = {
      position: 'relative',
      width: '700px',
      margin: 'auto',
    }
    return (
      <div style={rootStyle}>
        <h1>chart here</h1>
        <ChartBoard
          index={this.state.index}
          data={this.prepareData(stat_data)}
          subChartClickHandler={index => {this.subChartClickHandler(index)}}
        />
      </div>
    );
  }
}

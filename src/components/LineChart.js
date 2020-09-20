import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


class LineChart extends Component {
    

    constructor(props) {
        super(props);
        this.state = {};

        this.state.options = {
            chart: {
              type: 'spline'
            },
            title: {
              text: 'My chart'
            },
            series: [
              {
                data: [1, 2, 1, 4, 3, 6]
              }
            ]
          };
    }

    

      render() {
        return(<HighchartsReact highcharts={Highcharts} options={this.state.options} />)
      }
}

export default LineChart;
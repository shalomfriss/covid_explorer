import React, { Component } from 'react';
import './App.css';
import LineChart from "./components/LineChart";
import DeckGLMap from "./components/DeckGLMap";
import KeplerGLMap from "./components/KeplerGLMap";
import ReactDataGrid from "./components/ReactDataGrid";
import logo from './logo.svg';

class App extends Component {

  constructor(props) {
      super(props);
      this.grid = React.createRef()
      this.map = React.createRef()
      this.lineChart = React.createRef()

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

  componentDidMount() {
    
    fetch("https://api.covid19api.com/summary")
      .then(res => res.json())
      .then(
            (result) => {
              console.log(result.Global)
              console.log(result.Countries)
              console.log(this.grid)
              

              const defaultColumnProperties = {
                sortable: true,
                //width: 200
              };
              
              const theColumns = [
                {field: "Country", title: "Country"}, 
                //{key: "Date", name: "Date"}, 
                {field: "TotalConfirmed", title: "Total Confirmed"}, 
                {field: "TotalDeaths", title: "Total Deaths"}, 
                {field: "TotalRecovered", title: "Total Recovered"},
                
                {field: "NewConfirmed", title: "New Confirmed"}, 
                {field: "NewDeaths", title: "New Deaths"}, 
                {field: "NewRecovered", title: "New Recovered"}
                //{key: "Slug", name: "Slug"}, 
                ]
                
              
              this.grid.current.setData(result.Countries, theColumns, result.Global)
            },
            (error) => {
              console.log(error)
            }
        )
  }

    render() {
      return(
        <div className="App">
          <div>
          <DeckGLMap ref={this.map} />
          </div>
          <div>
          <ReactDataGrid ref={this.grid} />
          </div>
          
        </div>)
    }
}

//          <LineChart ref={this.lineChart} />

export default App;
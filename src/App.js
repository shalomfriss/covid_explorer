import React, { Component } from 'react';
import './App.css';
import LineChart from "./components/LineChart";
import DeckGLMap from "./components/DeckGLMap";
import KeplerGLMap from "./components/KeplerGLMap";
import ReactDataGrid from "./components/ReactDataGrid";
import logo from './logo.svg';
import Split from 'react-split'
import { readString, readRemoteFile } from 'react-papaparse'
import  countryText  from './data/countries';
import Button from 'react-bootstrap/Button';
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';
import './css/theme-black.css';


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
      
      this.countryMap = []
      countryText.map(item => {
        this.countryMap[item.country] = {latitude: item.latitude, longitude: item.longitude}
      })
      this.state.result = {}

  }

  componentDidMount() {
    this.loadData()
  }

  

  loadData() {
    fetch("https://api.covid19api.com/summary")
      .then(res => res.json())
      .then(
            (result) => {

              const defaultColumnProperties = {
                sortable: true,
                //width: 200
              };
              
              const theColumns = [
                {field: "Country", title: "Country", defaultSort: "desc"}, 
                {field: "TotalConfirmed", title: "Total Confirmed", defaultSort: "desc"}, 
                {field: "TotalDeaths", title: "Total Deaths", defaultSort: "desc"}, 
                {field: "TotalRecovered", title: "Total Recovered", defaultSort: "desc"},
                {field: "ActiveCases", title: "Active Cases", defaultSort: "desc"},
                {field: "NewConfirmed", title: "New Confirmed", defaultSort: "desc"}, 
                {field: "NewDeaths", title: "New Deaths", defaultSort: "desc"}, 
                {field: "NewRecovered", title: "New Recovered", defaultSort: "desc"}
                //{key: "Date", name: "Date"}, 
                //{key: "Slug", name: "Slug"}, 
                ]

                //Add lat long
                result.Countries.map(item => {
                  if(this.countryMap[item.CountryCode]){
                    item.latitude = this.countryMap[item.CountryCode].latitude
                    item.longitude = this.countryMap[item.CountryCode].longitude
                  }

                  item.ActiveCases = item.TotalConfirmed - item.TotalRecovered - item.TotalDeaths
                })

                //active cases = total cases - total recovered - total deaths
              
                /*
              this.setState({
                columns: theColumns,
                result: result
              })
              */
              this.state.columns = theColumns
              this.state.result = result
              this.grid.current.setData(this.state.result.Countries, this.state.columns, this.state.result.Global)
              this.map.current.setData(this.state.result)
              
            },
            (error) => {
              console.log(error)
            }
        )
  }
    
  buttonClick(e) {
    console.log("click", e, e.data)

  }
  render() {
    return(
      <div className="App">
        
        
        <div style={{height: 800}}>
          <DeckGLMap ref={this.map} data={this.state.result.Countries} />
        </div>
        <div style={{width: "100%", height: "40px", paddingTop: "10px"}}>
          <AwesomeButton type="primary" className="mapButton" data="test123" onClick={buttonClick}>Total Confirmed</AwesomeButton>
          <AwesomeButton type="primary" className="mapButton">Total Deaths</AwesomeButton>
          <AwesomeButton type="primary" className="mapButton">Total Recovered</AwesomeButton>
          <AwesomeButton type="primary" className="mapButton">Active Cases</AwesomeButton>
          <AwesomeButton type="primary" className="mapButton">New Confirmed</AwesomeButton>
          <AwesomeButton type="primary" className="mapButton">New Deaths</AwesomeButton>
          <AwesomeButton type="primary" className="mapButton">New Recovered</AwesomeButton>
        </div>
        <div>
          <ReactDataGrid ref={this.grid} />
        </div>
      </div>)
  }
}

export default App;
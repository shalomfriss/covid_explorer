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
            console.log(result)
            },
            (error) => {
            console.log(error)
            }
        )
    
  }

    render() {
      return(
        <div className="App">
          <table>
            <tr>
              <td><DeckGLMap /></td>
            </tr>
            <tr>
              <td><LineChart/> </td>
            </tr>
            <tr>
              <td><ReactDataGrid/> </td>
            </tr>
          </table>
          
        </div>)
    }
}

export default App;
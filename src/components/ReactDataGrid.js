import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import './ReactDataGrid.css';
import { createMuiTheme } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';


class ReactDataGrid extends Component {
  
    constructor(props) {
        super(props);
        this.grid = React.createRef()
        this.state = {rows: [
            { id: 0, title: 'Example' },
            { id: 1, title: 'Demo' }
          ], columns: [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' }
          ],
          title: "Summary",
          globalData: {}
        };
    }
    
    setData(theRows, theColumns, globalData) {
        this.setState({rows: theRows, columns: theColumns, globalData: globalData})
    }

    componentDidMount() {
      
    }
    
    
    render() {
      const theme = createMuiTheme({
        palette: {
          primary: {
            main: '#4caf50',
          },
          secondary: {
            main: '#ff9100',
          },
        },
    
      });

      const bigBold = {
        fontSize: "24px"
      };

        return (
          <div>
            <div className='globalsDiv'>
              <div>
                <div className='globalEntry'>
                  <div className='globalEntryTitle' style={bigBold}>Total Confirmed:</div> 
                  <div className='globalEntryValue' style={bigBold}>
                    <NumberFormat value={this.state.globalData.TotalConfirmed} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div> 
                
                <div className='globalEntry'>
                  <div className='globalEntryTitle'>Total Deaths:</div>    
                  <div className='globalEntryValue'>
                    <NumberFormat value={this.state.globalData.TotalDeaths} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div> 

                <div className='globalEntry'>
                  <div className='globalEntryTitle'>Total Recovered:</div> 
                  <div className='globalEntryValue'>
                    <NumberFormat value={this.state.globalData.TotalRecovered} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div> 
              
                <div className='globalEntry'>
                  <div className='globalEntryTitle'>New Confirmed:</div>   
                  <div className='globalEntryValue'>
                    <NumberFormat value={this.state.globalData.NewConfirmed} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div> 

                <div className='globalEntry'>
                  <div className='globalEntryTitle'>New Deaths:</div>      
                  <div className='globalEntryValue'>
                    <NumberFormat value={this.state.globalData.NewDeaths} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div> 
                
                <div className='globalEntry'>
                  <div className='globalEntryTitle'>New Recovered:</div>   
                  <div className='globalEntryValue'>
                    <NumberFormat value={this.state.globalData.NewRecovered} displayType={'text'} thousandSeparator={true} />
                  </div>
                </div> 
              </div>
            </div>
            <br/>
            <MaterialTable
              title={this.state.title}
              columns={this.state.columns}
              data={this.state.rows}
              actions={[
                {
                  icon: 'save',
                  tooltip: 'Save User',
                  onClick: (event, rowData) => {
                    console.log(rowData)
                  }
                }
              ]}
              options={{
                headerStyle: {
                  backgroundColor: '#fbff12',
                  color: '#0c0f0a',
                  //fontWeight: "bold",
                  fontSize: "18px"
                },
                rowStyle: {
                  backgroundColor: '#eeeeee',
                  color: '#252525',
                  fontSize: "18px"
                }
              }}
            />
        </div>
        );
    }

}

export default ReactDataGrid;
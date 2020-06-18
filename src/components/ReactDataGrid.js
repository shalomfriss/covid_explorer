import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';


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
          ]};
    }
    
    setData(theRows, theColumns) {
        this.setState({rows: theRows, columns: theColumns})
    }

    componentDidMount() {
    
    }
    
    
    render() {
              
        
        return (
          <MaterialTable
          // other props
          columns={this.state.columns}
          data={this.state.rows}
      />
        );
    }

}

export default ReactDataGrid;
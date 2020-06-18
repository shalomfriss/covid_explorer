import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

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
            <DataGrid
                columns={this.state.columns}
                rows={this.state.rows}
                ref={this.grid}
            />
        );
    }

}

export default ReactDataGrid;
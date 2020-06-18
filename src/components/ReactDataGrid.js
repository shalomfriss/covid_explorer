import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

class ReactDataGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    
    }

    render() {
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' }
          ];
          
          const rows = [
            { id: 0, title: 'Example' },
            { id: 1, title: 'Demo' }
          ];

        return (
            <DataGrid
                columns={columns}
                rows={rows}
            />
        );
    }

}

export default ReactDataGrid;
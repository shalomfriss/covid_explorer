import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeckGL from '@deck.gl/react';
import {LineLayer, ScatterplotLayer, PathLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';



class DeckGLMap extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {};

        this.state.initialViewState = {
            longitude: -74.00578,
            latitude: 40.713067,
            zoom: 8,
            pitch: 0,
            bearing: 0
        };
        this.state.data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];
        this.state.token = "pk.eyJ1Ijoic2hhbG9tZnJpc3MiLCJhIjoiY2l2Mm9sanZlMDBjbjJ0bW0yZW4yY3RzdCJ9.zUxsw0zwKk1O38YSRpm9OA"
    }

    componentDidMount() {
    }

    setData(data) {
        this.setState({data: data})
    }

    render() {
        /*
        const data = this.state.data;
        const layers = [
            new ScatterplotLayer({data})
            //new LineLayer({id: 'line-layer', this.state.data})
        ];
        */
       
        const mdata = [{
            name: "random-name",
            color: [101, 147, 245],
            path:[[-74.00578, 40.713067],
                  [-74.004577, 40.712425],
                  [-74.003626, 40.713650],
                  [-74.002666, 40.714243],
                  [-74.002136, 40.715177],
                  [-73.998493, 40.713452],
                  [-73.997981, 40.713673],
                  [-73.997586, 40.713448],
                  [-73.99256, 40.713863]]}
           ]

           /*
           const mdata = [{
            name: "random-name",
            color: [101, 147, 245],
            path:[[40.713067, -74.00578],
                  [40.712425, -74.004577],
                  [40.713650, -74.003626],
                  [40.714243, -74.002666],
                  [40.715177, -74.002136],
                  [40.713452, -73.998493],
                  [40.713673, -73.997981],
                  [40.713448, -73.997586],
                  [40.713863, -73.99256]]}
           ]
            */
           
        const pathLayer = [
            new PathLayer({
             id: "path-layer",
             mdata,
             getWidth: data => 7,
             getColor: data => data.color,
             widthMinPixels: 7
           })
          ]
        
          const layers = [
            pathLayer
          ]

        return (
        
        <DeckGL
            initialViewState={this.state.initialViewState}
            controller={true}
            layers={layers}
            width={"100%"}
            height={750}
            style={{position:"relative"}}
            
        >
            <StaticMap 
                mapboxApiAccessToken={this.state.token} 
                mapStyle='mapbox://styles/mapbox/dark-v9'
                //mapStyle='mapbox://styles/mapbox/streets-v11'
            />
        </DeckGL>
          
        );
    }

}

export default DeckGLMap;
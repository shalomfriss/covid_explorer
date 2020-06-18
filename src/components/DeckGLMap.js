import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

class DeckGLMap extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {};

        this.state.viewState = {
            longitude: -122.41669,
            latitude: 37.7853,
            zoom: 13,
            pitch: 0,
            bearing: 0
        };
        this.state.data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];
        this.state.token = "pk.eyJ1Ijoic2hhbG9tZnJpc3MiLCJhIjoiY2l2Mm9sanZlMDBjbjJ0bW0yZW4yY3RzdCJ9.zUxsw0zwKk1O38YSRpm9OA"
    }

    componentDidMount() {
    }

    render() {
        const data = [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}];
        const layers = [
          new LineLayer({id: 'line-layer', data})
        ];
        
        return (

            
        <DeckGL
            initialViewState={this.state.viewState}
            controller={true}
            layers={layers}
            width={"100%"}
            height={750}
        >
            <StaticMap mapboxApiAccessToken={this.state.token} />
          </DeckGL>
            
          
        );
    }

}

export default DeckGLMap;
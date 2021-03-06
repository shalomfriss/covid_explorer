import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DeckGL from '@deck.gl/react';
import {LineLayer, PathLayer} from '@deck.gl/layers';
import {GeoJsonLayer, TextLayer, ScatterplotLayer} from '@deck.gl/layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {StaticMap} from 'react-map-gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {MapboxLayer} from '@deck.gl/mapbox';
import MapGL, {GeolocateControl } from 'react-map-gl'
import {IconLayer} from 'deck.gl';


const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
  });
  
  const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-0.144528, 49.739968, 80000]
  });
  
  const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [-3.807751, 54.104682, 8000]
  });
  
  const lightingEffect = new LightingEffect({ambientLight, pointLight1, pointLight2});
  
  const material = {
    ambient: 0.64,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [51, 51, 51]
  };

  const colorRange = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];

  const elevationScale = {min: 1, max: 50};


class DeckGLMap extends Component {
    
    static get defaultColorRange() {
        return colorRange;
    }
    
    constructor(props) {
        super(props);

        this.state = {
          elevationScale: elevationScale.min,
          initialViewState : {
              longitude: -74.00578,
              latitude: 40.713067,
              zoom: 2,
              pitch: 30,
              bearing: 0
          },
          data : props.data,
          token : "pk.eyJ1Ijoic2hhbG9tZnJpc3MiLCJhIjoiY2l2Mm9sanZlMDBjbjJ0bW0yZW4yY3RzdCJ9.zUxsw0zwKk1O38YSRpm9OA",
          layers: [],
          currentField: "TotalConfirmed"
        };

        this.map = React.createRef()
        this.mapbox = React.createRef()
    }

    componentDidMount() {}
    
    formatNumber (value) {
      return new Intl.NumberFormat().format(value);
    }

    setData(data) {
      if(!data || !data.Countries) { 
        console.log("No data")
        return 
      }
      
      data.Countries.map(item => {
        item.text = this.formatNumber(item[this.state.currentField]) + ""
      })
      this.setState({data: data})
      this._renderLayers()
    }
    
    renderField(theField) {
      console.log("Render Field", theField)
      
      let tempData = this.state.data
      tempData.Countries.map(item => {
        item.text = this.formatNumber(item[theField]) + ""
        console.log(item.Country, item.text, item[theField])
      })
      
      this.setState({
        currentField: theField,
      })
      
    }
    
    _renderLayers() {
        if(!this.state.data || !this.state.data.Countries) {
          console.log("No map data")
          return
        }
        
        const radius = 1000
        const upperPercentile = 100
        const coverage = 1
        
        const ICON_MAPPING = {
          marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
        };
        
        const theData = this.state.data.Countries
        const layers = [
          new IconLayer({
            id: 'icon',
            theData,
            getIcon: d => 'marker',
            getPosition: d => [d.longitude, d.latitude, 0],
            iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
            iconMapping: ICON_MAPPING,
            sizeUnits: 'meters',
            sizeScale: 2000,
            sizeMinPixels: 6
          }),
          new ScatterplotLayer({
            id: 'my-scatterplot',
            data: this.state.data.Countries,
            getPosition: d => [d.longitude, d.latitude, 0],
            getRadius: d => d[this.state.currentField] / 10,
            radiusScale: 10,
            radiusMinPixels: 5,
            radiusMaxPixels: 30,
            opacity: 0.8,
            getColor: [255, 20, 100],
            updateTriggers: {
                getRadius: d => d[this.state.currentField] / 10,
            },
          }),
          new TextLayer({
            data: this.state.data.Countries,
            getPosition: d => [d.longitude, d.latitude, 0],
            getText: d => d.text,
            getSize: d => Math.max( d[this.state.currentField] / 50000 > 36 ? 36 : d[this.state.currentField] / 50000, 16),
            getColor: [247,248,243],
            getTextAnchor: 'middle',
            getAlignmentBaseline: 'center',
            parameters: {
              depthTest: false
            },
            updateTriggers: {
              getText: d => d.text,
              getSize: d => Math.max( d[this.state.currentField] / 50000 > 36 ? 36 : d[this.state.currentField] / 50000, 16),
            },
          }),
        ];
        
        
        return layers
    }
    
    mapLoaded() {
      
    }
    
    render() {
        console.log("RENDER", this.state.currentField)
        
        return (
          <DeckGL
            ref={this.map} 
            initialViewState={this.state.initialViewState}
            controller={true}
            layers={this._renderLayers()}
            width={"100%"}
            height={"100%"}
            style={{position:"relative"}}
            effects={[lightingEffect]}
        >
          
          <MapGL
            id="mapbox"
            mapboxApiAccessToken={this.state.token} 
            mapStyle='mapbox://styles/mapbox/dark-v9'
            ref={this.mapbox}
            onLoad={this.mapLoaded}
          />
        
        </DeckGL>
        );
    }

}

export default DeckGLMap;

import React, {Component} from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {addDataToMap, wrapTo} from 'kepler.gl/actions';
import KeplerGl from 'kepler.gl';

import config from '../configurations/config';

export default class FreshMap extends Component {
  componentDidMount() {

   
  }

  render() {
    const {mapboxApiAccessToken, id} = this.props;

    return (
      <AutoSizer>
        {({height, width}) => (
          <KeplerGl
            mapboxApiAccessToken={"pk.eyJ1Ijoic2hhbG9tZnJpc3MiLCJhIjoiY2l2Mm9sanZlMDBjbjJ0bW0yZW4yY3RzdCJ9.zUxsw0zwKk1O38YSRpm9OA"}
            id={id}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    );
  }
}

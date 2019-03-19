import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';

import ControlPanel from './control-panel';
import CityPin from './city-pin';
import CityInfo from './city-info';

import CITIES from '../../fakedata/cities.json';
import RecentIncident from '../contacts/RecentIncidents';

const TOKEN = 'pk.eyJ1IjoiaGFycml6b250YWwiLCJhIjoiY2l6YWw3YW90MDQ1NzJ3cDl5bXd4M2Y4aSJ9.CnTz5K2ShZcuLiG0xYLBKw'; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100vh",
        height: "50vh",
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  }

  _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude} >
        <CityPin size={20} onClick={() => this.setState({ popupInfo: city })} />
      </Marker>
    );
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({ popupInfo: null })} >
        <CityInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {

    const { viewport } = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={TOKEN} >

          {CITIES.map(this._renderCityMarker)}

          {this._renderPopup()}

          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>

        </MapGL>
        <RecentIncident />
      </div>

    );
  }

}

export function renderToDom(container) {
  render(<App />, container);
}
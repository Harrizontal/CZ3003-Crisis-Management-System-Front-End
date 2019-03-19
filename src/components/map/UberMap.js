import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';

const TOKEN = 'pk.eyJ1IjoiaGFycml6b250YWwiLCJhIjoiY2l6YWw3YW90MDQ1NzJ3cDl5bXd4M2Y4aSJ9.CnTz5K2ShZcuLiG0xYLBKw'
class UberMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                width: '100vh',
                height: '100vh',
                latitude: 1.275635,
                longitude: 103.842275,
                zoom: 11
            }
        }
    }


    _updateViewport = (viewport) => {
        this.setState({ viewport });
    }

    render() {
        const { viewport } = this.state;

        return (
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={TOKEN}
                onViewportChange={this._updateViewport}
            >
            </ReactMapGL>
        );
    }
}

export default UberMap
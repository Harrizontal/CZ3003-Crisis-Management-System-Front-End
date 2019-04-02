/* global window, fetch */
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL from "react-map-gl";
import { connect } from "react-redux";

import { defaultMapStyle, dataLayer } from "./map-style.js";
import { fromJS } from "immutable";
import { json as requestJson } from "d3-request";
import PropTypes from "prop-types";

import { getMapData } from "../../actions/infoActions";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFycml6b250YWwiLCJhIjoiY2l6YWw3YW90MDQ1NzJ3cDl5bXd4M2Y4aSJ9.CnTz5K2ShZcuLiG0xYLBKw"; // Set your mapbox token here

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100vh",
        height: "50vh",
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        zoom: 12,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  componentDidMount() {
    //this.props.getMapData();
    requestJson(
      require("./dengue-clusters-geojson.geojson"),
      (error, response) => {
        if (!error) {
          this._loadData(response);
        } else {
          console.log("Error loading map");
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    console.log(nextProps);
    this._loadData(this.props.map.mapData);
  }
  _loadData = data => {
    //updatePercentiles(data, f => f.properties.income[this.state.year]);
    console.log(fromJS({ type: "geojson", data }));
    const mapStyle = defaultMapStyle
      // Add geojson source to map
      .setIn(["sources", "incomeByState"], fromJS({ type: "geojson", data }))
      // Add point layer to map
      .set("layers", defaultMapStyle.get("layers").push(dataLayer));

    console.log(mapStyle);
    this.setState({ data, mapStyle });
  };

  _onViewportChange = viewport => this.setState({ viewport });

  _onHover = event => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = event;
    const hoveredFeature =
      features && features.find(f => f.layer.id === "data");

    this.setState({ hoveredFeature, x: offsetX, y: offsetY });
  };

  _renderTooltip() {
    const { hoveredFeature, year, x, y } = this.state;
    //console.log(hoveredFeature);
    return (
      hoveredFeature && (
        <div className="tooltip" style={{ left: x, top: y }}>
          <div>State: {hoveredFeature.properties.Name}</div>
          <div>
            Median Household Income: {hoveredFeature.properties.Description}
          </div>
          <div>
            Percentile: {(hoveredFeature.properties.percentile / 8) * 100}
          </div>
        </div>
      )
    );
  }

  render() {
    const { viewport, mapStyle } = this.state;
    console.log("render: " + this.props.latitude + " " + this.props.longitude);
    // let data = this.props.map.mapData;

    // console.log(this.props.longitude + " and " + this.props.latitude);

    // if (data == undefined) {
    //   const mapStyle = defaultMapStyle
    //     // Add geojson source to map
    //     .setIn(["sources", "incomeByState"], fromJS({ type: "geojson", data }))
    //     // Add point layer to map
    //     .set("layers", defaultMapStyle.get("layers").push(dataLayer));
    // }
    return (
      <div style={{ height: "100%" }}>
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={mapStyle}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onHover={this._onHover}
        >
          {this._renderTooltip()}
        </MapGL>
      </div>
    );
  }
}

MapView.propTypes = {
  map: PropTypes.object.isRequired,
  getMapData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  //contacts: state.contact.contacts
  map: state.map
  // able to accept from this.props.contacts
});

export default connect(
  mapStateToProps,
  { getMapData }
)(MapView);

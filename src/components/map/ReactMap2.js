/* global mapboxgl */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { clickMap, setStyle } from "../../actions/mapActions";
import MAP_STYLE from "./map-style-basic-v8.json";
import { getInitialMapData } from "../../actions/mapActions";

const id = "data";

class ReactMap2 extends Component {
  state = {
    listOfMarkers: []
  };
  _generateSourceAndLayer = (map, id, mapSource, mapLayer) => {
    if (map.getSource(id)) {
      console.log("There is source available, just update it");
      map.getSource(id).setData(mapSource);
      if (mapLayer !== undefined) {
        if (map.getLayer(id)) {
          console.log("There is layer available, remove and add new layer");
          map.removeLayer(id);

          //map.getLayoutProperty("data", "paint", mapLayer);
          map.addLayer(mapLayer);
        } else {
          console.log("There is no layer available, creating layer it");
          map.addLayer(mapLayer);
        }
      }
    } else {
      console.log(
        "There is no source available, creating both source and layer it"
      );
      map.addSource(id, { type: "geojson", data: mapSource });
      if (mapLayer !== undefined) {
        map.addLayer(mapLayer);
      }
    }
  };

  _generateMarkers = (map, type, mapSource) => {
    var array = []; // too keep markers - for removing later.
    switch (type) {
      case "fill":
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });
        mapSource.features.forEach(function(marker) {
          map.on("mouseenter", "data", e => {
            //const features = map.queryRenderedFeatures(e.point);
            popup
              .setLngLat(e.lngLat)
              .setHTML(e.features[0].properties.LOCALITY)
              .addTo(map);
          });

          map.on("mouseleave", "data", function() {
            popup.remove();
          });
        });
        break;
      case "marker":
        var popup;
        mapSource.features.forEach(function(marker) {
          var el = document.createElement("div");

          var forecast = marker.properties.forecast.toLowerCase();
          if (forecast.includes("rain")) {
            el.className = "rain-marker";
          } else if (forecast.includes("sun")) {
            el.className = "sun-marker";
          } else if (forecast.includes("cloud")) {
            el.className = "cloud-marker";
          } else if (forecast.includes("thunder")) {
            el.className = "thunder-marker";
          } else if (forecast.includes("showers")) {
            el.className = "showers-marker";
          } else {
            el.className = "psi-marker";
          }
          el.style.width = "50px";
          el.style.height = "50px";

          popup = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          array.push(popup);
        });
        this.setState({ listOfMarkers: array });
        break;
      case "psimarker":
        var popup;
        var popup2;
        mapSource.features.forEach(function(marker) {
          var el = document.createElement("div");
          el.className = "psi-marker";
          el.style.width = "50px";
          el.style.height = "50px";

          popup2 = new mapboxgl.Popup({
            closeOnClick: false,
            offset: 20
          }).setText(marker.properties.pm25_sub_index);

          popup = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(popup2)
            .addTo(map);

          array.push(popup);
        });
        this.setState({ listOfMarkers: array });
        break;
    }
  };

  componentDidMount() {
    // set map properties
    const { token, longitude, latitude, zoom, minZoom, styleID } = this.props;
    const mapConfig = {
      container: "map",
      //style: `mapbox://styles/${styleID}`,
      style: MAP_STYLE,
      center: [longitude, latitude],
      zoom: zoom
    };
    if (this.props.pitch) mapConfig["pitch"] = this.props.pitch;
    if (this.props.bearing) mapConfig["bearing"] = this.props.bearing;

    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map(mapConfig);
    // load dengue data first
    this.props.getInitialMapData();
  }

  // Utilizes diffStyles to update the DOM map from a new Immutable stylesheet
  componentWillReceiveProps(nextProps) {
    if (this.props.mapInformation === null) return;
    const before = this.props.mapInformation;
    const after = nextProps.mapInformation;
    const map = this.map;

    const mapSource = after["mapSourceData"];
    const mapLayer = after["mapLayer"];
    const type = after["type"];

    if (this.state.listOfMarkers.length > 0) {
      this.state.listOfMarkers.forEach(function(marker) {
        marker.remove();
      });
    }

    if (after) {
      this._generateSourceAndLayer(map, id, mapSource, mapLayer);
      this._generateMarkers(map, type, mapSource);
    }
  }

  render() {
    return <div style={{ width: "100%", height: "100%" }} id="map" />;
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(
//     {
//       clickMap: clickMap,
//       setStyle: setStyle
//     },
//     dispatch
//   );
// }
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      clickMap: clickMap,
      setStyle: setStyle,
      getInitialMapData: getInitialMapData
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    userInterface: state.userInterface,
    mapInformation: state.overviewInformation
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   mapDispatchToProps
)(ReactMap2);

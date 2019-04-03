/* global mapboxgl */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";

import { clickMap, setStyle } from "../../actions/mapActions";
import diffStyles from "./diff.js";
import MAP_STYLE from "./map-style-basic-v8.json";
import { defaultMapStyle } from "./map-style";

const id = "data";

class ReactMap2 extends Component {
  state = {
    listOfMarkers: []
  };
  _generateSource = (map, id, mapSource) => {};
  _generateLayer = (id, mapLayer) => {};
  _generateMarkers = (map, type, mapSource) => {
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    var array = [];
    console.log(mapSource);
    switch (type) {
      case "fill":
        mapSource.features.forEach(function(marker) {
          map.on("mouseenter", "data", e => {
            const features = map.queryRenderedFeatures(e.point);
            var getDescription = features[0]["properties"]["Description"];

            popup
              .setLngLat(e.lngLat)
              .setHTML(getDescription)
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
          el.className = "marker";
          el.style.backgroundImage =
            "url(http://openweathermap.org/img/w/02n.png";
          el.style.width = "50px";
          el.style.height = "50px";

          el.addEventListener("click", function() {
            window.alert(
              marker.properties.location + "" + marker.properties.status
            );
          });

          popup = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
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

    // this.map.on("load", () => {
    //   // Get the map style and set it in the state tree
    //   // const style = this.map.getStyle();
    //   // this.props.setStyle(style);
    //   // this.map.on("mouseenter", "data", e => {
    //   //   const features = this.map.queryRenderedFeatures(e.point);
    //   //   var getDescription = features[0]["properties"]["Description"];
    //   //   popup
    //   //     .setLngLat(e.lngLat)
    //   //     .setHTML(getDescription)
    //   //     .addTo(this.map);
    //   // });
    //   // this.map.on("mouseleave", "data", function() {
    //   //   popup.remove();
    //   // });
    // });
  }

  // Utilizes diffStyles to update the DOM map from a new Immutable stylesheet
  componentWillReceiveProps(nextProps) {
    if (this.props.mapInformation === null) return;
    console.log(nextProps);
    const before = this.props.mapInformation;
    const after = nextProps.mapInformation;
    const map = this.map;

    console.log(before);
    console.log(after);
    const mapSource = after["mapSourceData"];
    const mapLayer = after["mapLayer"];
    const type = after["type"];

    // console.log(before["mapSourceData"]);
    // if (before["mapSourceData"] !== "") {
    //   before["mapSourceData"].features.forEach(function(marker) {
    //     marker.remove();
    //   });
    // }

    console.log(this.state.listOfMarkers);

    if (this.state.listOfMarkers.length > 0) {
      this.state.listOfMarkers.forEach(function(marker) {
        marker.remove();
      });
    }

    if (after) {
      if (map.getSource("data")) {
        console.log("There is source available, just update it");
        map.getSource("data").setData(mapSource);
        if (mapLayer !== undefined) {
          if (map.getLayer("data")) {
            console.log("There is layer available, remove and add new layer");
            map.removeLayer("data");

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
        map.addSource("data", { type: "geojson", data: mapSource });
        if (mapLayer !== undefined) {
          map.addLayer(mapLayer);
        }
      }

      this._generateMarkers(map, type, mapSource);

      //   // console.log("there is value in after");
      //   // if (map.getSource("data") === undefined) {
      //   //   map.addSource("data", { type: "geojson", data: after[0] });
      //   // } else {
      //   //   map.getSource("data").setData(after[0]);
      //   // }

      //   // if (map.getLayoutProperty("data") === undefined) {
      //   //   map.addLayer({
      //   //     id: "data",
      //   //     type: "fill",
      //   //     source: "data",
      //   //     paint: after[1]
      //   //   });
      //   // } else {
      //   //   map.getLayoutProperty("data", "paint", after[1]);
      //   // }
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
      setStyle: setStyle
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

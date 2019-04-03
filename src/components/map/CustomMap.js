/* global mapboxgl */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";

import { clickMap, setStyle } from "../../actions/mapActions";
import diffStyles from "./diff.js";
import MAP_STYLE from "./map-style-basic-v8.json";
import { defaultMapStyle } from "./map-style";
import { dengueLayer, dengueData, dengueLayerPaint } from "../map/map-style";

class CustomMap extends Component {
  componentDidMount() {
    // set map properties
    const { token, longitude, latitude, zoom, minZoom, styleID } = this.props;
    const mapConfig = {
      container: "map",
      //style: `mapbox://styles/${styleID}`,
      style: MAP_STYLE,
      center: [longitude, latitude],
      zoom: 1
    };
    if (this.props.pitch) mapConfig["pitch"] = this.props.pitch;
    if (this.props.bearing) mapConfig["bearing"] = this.props.bearing;

    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map(mapConfig);
    console.log(this.map);

    var url = "https://wanderdrone.appspot.com/";
    const custMap = this.map;
    this.map.on("load", () => {
      // Get the map style and set it in the state tree
      const style = this.map.getStyle();
      this.props.setStyle(style);
      this.map.addSource("drone", { type: "geojson", data: dengueData });
      console.log(this.map);
      console.log(this.map.isSourceLoaded("drone"));
      //   window.setInterval(function() {
      //     console.log(custMap.isSourceLoaded("drone"));
      //     if (custMap.isSourceLoaded("drone")) {
      //       custMap.getSource("drone").setData(url);
      //     }
      //   }, 2000);

      //this.map.addLayer("drone", dengueLayerPaint);

      // this.map.addLayer({
      //   id: "drone",
      //   type: "symbol",
      //   source: "drone",
      //   layout: {
      //     "icon-image": "rocket-15"
      //   }
      // });
      this.map.addLayer({
        id: "drone",
        type: "fill",
        source: "drone",
        paint: dengueLayerPaint
      });

      setTimeout(function() {
        console.log("remove source drone");
        custMap.removeLayer("drone");
        custMap.removeSource("drone");
      }, 20000);
      //   this.map.on("click", e => {
      //     const features = this.map.queryRenderedFeatures(e.point);
      //     // Send a specific feature to the action/reducer:
      //     const currentLayer = this.props.userInterface.get("activeLayer");
      //     const selectedFeature = features.filter(
      //       f => f.layer.id === currentLayer
      //     );
      //     this.props.clickMap(selectedFeature[0]);

      //     // Make a popup from stateful markup:
      //     if (
      //       this.props.showPopUp &&
      //       this.props.userInterface.get("popup") != null
      //     ) {
      //       new mapboxgl.Popup()
      //         .setLngLat(e.lngLat)
      //         .setHTML(this.props.userInterface.get("popup"))
      //         .addTo(this.map);
      //     }
      //   });
    });
  }

  // Utilizes diffStyles to update the DOM map from a new Immutable stylesheet
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
    mapStyle: state.mapStyle,
    userInterface: state.userInterface
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   mapDispatchToProps
)(CustomMap);

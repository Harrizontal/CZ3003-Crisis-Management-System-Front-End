/* global mapboxgl */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getIncidents } from "../../actions/incidentActions";

import MAP_STYLE from "./map-style-basic-v8.json";
import { defaultMapStyle } from "./map-style";

const id = "data";

class ReactMap3 extends Component {
  state = {
    listOfMarkers: [],
    seconds: 0
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
      map.addSource("data", { type: "geojson", data: mapSource });
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
            const features = map.queryRenderedFeatures(e.point);
            var getDescription = marker["properties"]["Description"];

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
        var popup2;

        mapSource.features.forEach(function(marker) {
          var el = document.createElement("div");
          el.className = "marker";
          el.style.backgroundImage =
            "url(http://openweathermap.org/img/w/02n.png";
          el.style.width = "50px";
          el.style.height = "50px";

          // el.addEventListener("click", function() {
          //   window.alert(
          //     marker.properties.location + "" + marker.properties.status
          //   );
          // });
          popup2 = new mapboxgl.Popup({
            offset: 25
          }).setText(marker.properties.address);

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

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    // retrieve incident details
    this.interval = setInterval(() => this.props.getIncidents(), 5000);

    const { token, longitude, latitude, zoom, minZoom, styleID } = this.props;
    const mapConfig = {
      container: "map",
      style: MAP_STYLE,
      center: [longitude, latitude],
      zoom: zoom
    };

    if (this.props.pitch) mapConfig["pitch"] = this.props.pitch;
    if (this.props.bearing) mapConfig["bearing"] = this.props.bearing;

    mapboxgl.accessToken = token;
    this.map = new mapboxgl.Map(mapConfig);

    // load data here
    console.log("consoling this.props.incidents");
    console.log(this.props.incident);
  }

  // Utilizes diffStyles to update the DOM map from a new Immutable stylesheet
  componentWillReceiveProps(nextProps) {
    if (this.props.incident === null) return;
    console.log(nextProps);
    const before = this.props.mapInformation; // not needed
    const after = nextProps.incident;
    const map = this.map;

    console.log(before);
    console.log(after);
    const mapSource = after["mapSourceData"];
    const mapLayer = after["mapLayer"];
    const type = after["type"];

    console.log(this.state.listOfMarkers);

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getIncidents: getIncidents
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    incident: state.incident
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
  //   mapDispatchToProps
)(ReactMap3);
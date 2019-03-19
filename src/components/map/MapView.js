import React, { Component } from "react";
import ReactMapboxGl, {
  Layer,
  Feature,
  ScaleControl,
  ZoomControl,
  Marker
} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaGFycml6b250YWwiLCJhIjoiY2l6YWw3YW90MDQ1NzJ3cDl5bXd4M2Y4aSJ9.CnTz5K2ShZcuLiG0xYLBKw"
});

class MapView extends Component {
  render() {
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          center={[103.842275, 1.275635]}
        >
          <ScaleControl />
          <ZoomControl />
          <Layer
            type="circle"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={[103.842275, 1.275635]} />
          </Layer>

          <Marker coordinates={[103.842275, 1.275635]} anchor="bottom">
            Hello
          </Marker>
        </Map>
      </div>
    );
  }
}

export default MapView;

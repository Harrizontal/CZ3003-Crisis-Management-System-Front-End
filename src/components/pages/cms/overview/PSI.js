import React, { Component } from "react";

export default class PSI extends Component {
  constructor(props) {
    super(props);
  }

  displayPSIbasedOnLocation(data, location) {
    // console.log(data);
    //var points = data;
    var points = data;
    for (var i = 0; i < points.length; i++) {
      console.log(points[i].properties.area + "== " + location.toLowerCase());
      if (points[i].properties.area == location.toLowerCase()) {
        return points[i].properties.pm25_sub_index;
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            right: 0,
            bottom: "10px"
          }}
          className="psi-card"
        />
        <div
          className="containerLegendPSI"
          style={{
            zIndex: 2,
            position: "absolute",
            right: 0,
            bottom: "300px"
          }}
        >
          <table className="legendPSI">
            <tr>
              <th rowSpan="2">Area</th>
              <th rowSpan="2">PSI</th>
              <th className="aq">Quality</th>
            </tr>
            <tr>
              <th>Descriptor</th>
            </tr>
            <tr>
              <td>North</td>
              <td>
                {this.displayPSIbasedOnLocation(
                  this.props.mapSource["features"],
                  "north"
                )}
              </td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>South</td>
              <td>
                {this.displayPSIbasedOnLocation(
                  this.props.mapSource["features"],
                  "south"
                )}
              </td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>Central</td>
              <td>
                {this.displayPSIbasedOnLocation(
                  this.props.mapSource["features"],
                  "national"
                )}
              </td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>East</td>
              <td>
                {this.displayPSIbasedOnLocation(
                  this.props.mapSource["features"],
                  "east"
                )}
              </td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>West</td>
              <td>
                {this.displayPSIbasedOnLocation(
                  this.props.mapSource["features"],
                  "west"
                )}
              </td>
              <td>
                <div className="green" />
              </td>
            </tr>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

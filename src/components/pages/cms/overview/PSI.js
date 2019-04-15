import React, { Component } from "react";

export default class PSI extends Component {
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
              <td>50</td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>South</td>
              <td>44</td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>Central</td>
              <td>43</td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>East</td>
              <td>41</td>
              <td>
                <div className="green" />
              </td>
            </tr>
            <tr>
              <td>West</td>
              <td>43</td>
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

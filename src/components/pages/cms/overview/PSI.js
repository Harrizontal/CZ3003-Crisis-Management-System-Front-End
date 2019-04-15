import React, { Component } from "react";

export default class PSI extends Component {

  render() {
    return (
      <div 
        style={{        
        zIndex: 2,
        position: "absolute",
        right: "10px",
        bottom: "30px"
        }}
        className="psi-card">
         
      
      <div className= "containerLegendPSI"
      style = {{
        zIndex: 2,
        position: "absolute",
        right: "0px",
        bottom: "300px"
      }}
      >
        <table className="legendPSI">
          <tr>
            <th rowSpan="2">Area</th>
            <th rowSpan="2">PSI value</th>
            <th className="aq">Air Quality</th>
          </tr>
          <tr><th>Descriptor</th></tr>
          <tr>
            <td>North</td>
            <td>50</td>
            <td><div className="green"></div></td>
          </tr>
          <tr>
            <td>South</td>
            <td>44</td>
            <td><div className="green"></div></td>
          </tr>
          <tr>
            <td>Central</td>
            <td>43</td>
            <td><div className="green"></div></td>
          </tr>
          <tr>
            <td>East</td>
            <td>41</td>
            <td><div className="green"></div></td>
          </tr>
          <tr>
            <td>West</td>
            <td>43</td>
            <td><div className="green"></div></td>
          </tr>
        </table>
      </div>
      </div>
      
    );
  }
}

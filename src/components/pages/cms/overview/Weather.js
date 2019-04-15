import React, { Component } from "react";

export default class Weather extends Component {
  generateForecastWeather = forecast => {
    console.log(forecast);
    return (
      <div className="weather-forecast-header">
        {forecast.map(function(value) {
          return <div className="item"> {value.forecast}</div>;
        })}
      </div>
    );
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {this.generateForecastWeather(this.props.data)}
        <div style={{ width: "100%", height: "50%" }}>Weather</div>
        <div style={{ width: "100%", height: "50%" }}>adasd</div>
      </div>
    );
  }
}

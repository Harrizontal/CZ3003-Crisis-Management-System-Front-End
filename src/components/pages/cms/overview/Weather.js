import React, { Component } from "react";
import { DeviceBattery90 } from "material-ui/svg-icons";
export default class Weather extends Component {
  getTextualDate(date) {
    // convert dd-mm-yyy to Date object
    var date = new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    console.log(date);
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var day = days[date.getDay()];
    console.log(day);
    return day;
  }
  generateForecastWeather = forecast => {
    return (
      <div className="weather-forecast-card">
        <div className="weather-forecast-header">Weather forecast</div>
        {forecast.map(value => {
          return (
            <div className="weather-item">
              {this.getTextualDate(value.date)}: {value.forecast}
            </div>
          );
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
      </div>
    );
  }
}

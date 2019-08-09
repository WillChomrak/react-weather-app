import React, { Component } from "react";

class Weather extends Component {
  render() {
    return (
      <div className="weather-text">
        {this.props.city && (
          <p>
            City: {this.props.city}, {this.props.country}
          </p>
        )}
        {this.props.temperature && (
          <p>Temperature: {this.props.temperature}°C</p>
        )}
        {this.props.humidity && <p>Humidity: {this.props.humidity}%</p>}
        {this.props.description && <p>Description: {this.props.description}</p>}
        {this.props.error && <p>{this.props.error}</p>}
      </div>
    );
  }
}

export default Weather;

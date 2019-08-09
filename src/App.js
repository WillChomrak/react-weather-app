import React, { Component } from "react";

import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";

import "./App.css";
import "./queries.css";

const API_KEY = "504e03bcc767f8b27d9edfa0b28df403";

class App extends Component {
  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  getUserInput = e => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    return { city, country };
  };

  getWeather = async (city, country) => {
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&id=524901&APPID=${API_KEY}`
    );
    const data = await api_call.json();
    return data;
  };

  setWeather = (city, country, data) => {
    if (city && country && data.message !== "city not found") {
      this.setState({
        city: data.city.name,
        country: data.city.country,
        temperature: Math.round((data.list[0].main.temp - 273) * 10) / 10,
        humidity: data.list[0].main.humidity,
        description: data.list[0].weather[0].description,
        error: undefined
      });
    } else if (city && country && data.message === "city not found") {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        error: "City not found. Please try again."
      });
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please ensure both fields are filled and try again."
      });
    }
  };

  weatherController = async e => {
    // Prevent reload
    e.preventDefault();

    // Get user input
    const { city, country } = this.getUserInput(e);

    // Get weather from API
    const data = await this.getWeather(city, country);

    // Set state with weather data
    this.setWeather(city, country, data);
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="col-lg-5 col-md-6 col-xs-12 title-container">
              <Titles />
            </div>
            <div className="col-lg-7 col-md-6 col-xs-12 form-container">
              <Form getWeather={this.weatherController} />
              <Weather
                city={this.state.city}
                country={this.state.country}
                temperature={this.state.temperature}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

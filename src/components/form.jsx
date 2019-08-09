import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.props.getWeather}>
          <div>City:</div>
          <input type="text" name="city" placeholder="Toronto" />
          <div>Country:</div>
          <input type="text" name="country" placeholder="Canada" />
          <br />
          <button className="btn btn-lg">Search</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Form;

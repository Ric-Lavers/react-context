import React, { Component } from "react";
import ThemeContext from './context/ThemeContext'

class MyProvider extends Component {
  state = {
    name: "ric",
    age: 100
  };
  handleChange = event => {
    this.setState({ typed: event.target.value });
  };
  render() {
    return (
      <ThemeContext.Provider
        value={{
          state: this.state,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default MyProvider
import React, { Component } from "react";
import ThemeContext from "../context/ThemeContext";

class ThemeProvider extends Component {
  state = {
    topBarColor: "#E1DCD3",
    bodyColor: "#C4B086",
    primaryColor: "#FFF",
    secondaryColor: "#000"
  };
  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
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

export default ThemeProvider;

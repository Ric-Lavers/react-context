import React, { Component } from "react";
import ThemeContext from "../context/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";

import Battery from "./Battery";

import navStyle from "./NavBar.module.scss";

class NavBar extends Component {
  render() {
    return (
      <ThemeContext>
        {context => (
          <div
            className={navStyle["nav-bar"]}
            style={{ backgroundColor: context.state.theme.topBarColor }}
          >
            <Battery />
          </div>
        )}
      </ThemeContext>
    );
  }
}

export default NavBar;

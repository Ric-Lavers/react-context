import React, { Component } from "react";
import ThemeContext from "../context/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";
import { NavLink } from 'react-router-dom'

import Battery from "./Battery";

import navStyle from "./NavBar.module.scss";

const activeStyleBase = {
  textDecoration: 'underline'
}

class NavBar extends Component {
  render() {
    return (
      <ThemeContext>
        {context => (
          <div
            className={navStyle["nav-bar"]}
            style={{ 
              backgroundColor: context.state.theme.topBarColor
             }}
          >
            <Battery />
             <NavLink exact
             style={{color:context.state.theme.primaryColor, paddingLeft:16}}
             activeStyle={ Object.assign(activeStyleBase,{color:context.state.theme.secondaryColor}) }
              to="/" >home</NavLink>
             <NavLink 
             style={{color:context.state.theme.primaryColor, paddingLeft:16}}
             activeStyle={ Object.assign(activeStyleBase,{color:context.state.theme.secondaryColor}) }
              to="/cool-svg-draw" >Cool Svg Draw</NavLink>

          </div>
        )}
      </ThemeContext>
    );
  }
}

export default NavBar;

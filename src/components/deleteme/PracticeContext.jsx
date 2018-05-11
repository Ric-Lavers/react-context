import React, { Component } from "react";
import MyProvider from './MyProvider'
import ThemeContext from './context/ThemeContext'



class Person extends React.Component {
  render() {
    return (
      <div>
        <ThemeContext.Consumer>
          {context => (
            <div>
              <p>I'm the context.state: {JSON.stringify(context.state)}</p>
              <input onChange={context.handleChange} type="text" />
            </div>
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

class Appy extends React.Component {
  render() {
    return (
        <div className="Appy">
          APPY
          <Person />
        </div>
    );
  }
}



export default Appy;

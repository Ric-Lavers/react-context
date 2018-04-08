import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

//styles
import './App.scss';
//modules
import styles from './Style.module.css';
import sassStyles from './Second.module.scss';

// import Appy from './components/PracticeContext'
import ThemeProvider from './components/providers/ThemeProvider'
import ThemeContext from './components/context/ThemeContext'
import Welcome from './components/Welcome'
import NavBar from './components/navbar/NavBar'

import Home from './components/pages/Home'
import CommonBody from './components/pages/Body'

import * as api from './api/graphQL'

class App extends Component {

  state={
    coders: null
  }

  async componentDidMount(){
    console.count("app did mount")
    const res = await api.getAllCoders()
    console.log(res)
    res && this.setState({ coders: res })
  }

  render() {
    return (
      <div className="App">
        <Router>
        <ThemeProvider>
        <ThemeContext>
          {(c)=>
            <div style={{color:c.state.theme.bodyColor}} >
                <NavBar/>
                <div style={{paddingTop:60}} >
                  <Route exact path="/" component={ Home }/>
                  <CommonBody/>
                  <Welcome/>
                </div>
                <div>
                {this.state.coders 
                  ?JSON.stringify(this.state.coders)
                  :"loading"}
                </div>
            </div>
          }
          
        </ThemeContext>
        </ThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App;

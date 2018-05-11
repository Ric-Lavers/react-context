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

import PageSwitch from './components/pages/PageSwitch'

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
        
          <PageSwitch/>

        </ThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App;

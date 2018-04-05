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

class App extends Component {
  componentDidMount(){
    console.count("app did mount")
  }

  render() {
    return (
      <div className="App">
        <Router>
        <ThemeProvider>
            <NavBar/>
            <Route exact path="/" component={ Home }/>
            <CommonBody/>
            <Welcome/>
        </ThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App;

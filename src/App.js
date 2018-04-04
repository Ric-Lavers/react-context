import React, { Component } from 'react';
import logo from './logo.svg';

//components
import Emoji from './Emoji';

//styles
import './App.scss';

//modules
import styles from './Style.module.css';
import sassStyles from './Second.module.scss';

import Appy from './components/PracticeContext'
import MyProvider from './components/MyProvider'

class App extends Component {

  state={
    style:{
      headerBackgroundColor:'#fff',
      bodyBackgroundColor:'#fff'
    }
  }
  render() {
    return (
      <div className="App">
      <MyProvider>
        <div className={styles.test} style={{width:'100vw', height:'100vh'}}>
              <div>
              header
              </div>
              <div>
              <Appy/>
              body
              </div>
        </div>

      </MyProvider>
      </div>
    );
  }
}

export default App;

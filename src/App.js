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
import ThemeProvider from './components/providers/ThemeProvider'
import Welcome from './components/Welcome'

class App extends Component {

  state={
    style:{
      headerBackgroundColor:'#fff',
      bodyBackgroundColor:'#fff',
      openModal:true
    }
  }
  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal })
  }
  closeModal = () => {
    this.setState({ openModal: false })
  }

  render() {
    let { openModal } = this.state
    return (
      <div className="App">
      <ThemeProvider>
        <div className={styles.test} style={{width:'100vw', height:'100vh'}}>
              <div>
              header
              </div>
              <div>
              <Appy/>
              body
              </div>
        </div>
        <div
        onClick= { this.toggleModal } 
        style={{position: 'absolute', left:0, top:'50%', width:40, height: 80, border:'0.5px solid black'}} >
          <p style={{transform:'rotate(90deg)'}} >theme</p>
        </div>

        <Welcome open={openModal} closeModal={ this.closeModal }/>
      </ThemeProvider>
      </div>
    );
  }
}

export default App;

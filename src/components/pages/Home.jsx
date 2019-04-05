import React from 'react'
import ThemeContext from '../context/ThemeContext'

import Logo from './logo'
import eye from '../../images/aeon-flux-purple-eye-fly.jpg'
const fs = require('fs')

const styles = {
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    margin: '0 auto',
  }
}

const Home = () => {
  return (
    <div style={{width:'100vw', height:'100vh'}}>
      <a href={eye} download>download eye</a>

      <div style={styles.main} >
        <h4 style={styles.title}> site by</h4>
        <h1 style={styles.title}> RicLavers</h1>
        <Logo />
      </div>
    </div>
  )
}

export default Home
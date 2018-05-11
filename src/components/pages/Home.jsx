import React from 'react'
import ThemeContext from '../context/ThemeContext'

import eye from '../../images/aeon-flux-purple-eye-fly.jpg'
const fs = require('fs')



const Home = () => {
  return (
    <div style={{width:'100vw', height:'100vh'}}>
      <a href={eye} download>download eye</a>
    </div>
  )
}

export default Home
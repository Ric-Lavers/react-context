import React from 'react'
import {Route, Switch} from 'react-router-dom'

import ThemeContext from '../context/ThemeContext'

import Home from './Home'
import CoolSvgDraw from './CoolSvgDraw'
import NavBar from '../navbar/NavBar'
import Welcome from '../Welcome'
import MadelbrotPage from './MadelbrotPage'

const PageSwitch = () => {
  return (
    <ThemeContext>
      {(c)=>
        <Switch>
          <div style={{color:c.state.theme.bodyColor}} >
              <NavBar/>
              <div style={{paddingTop:60}} >
                <Switch>
                    <Route
                      path="/cool-svg-draw"
                      render={()=>  <CoolSvgDraw context= {c}/> }
                    />
                    <Route
                      path="/madelbrot"
                      render={()=>  <MadelbrotPage context= {c}/> }
                    />
                  <Route  exact path="/" component={ Home }/>
                </Switch>
                <Welcome context={c}/>
              </div>
          </div>
        </Switch>
      }
    </ThemeContext>
  )
}

export default PageSwitch
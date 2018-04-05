import React, { Component } from 'react'
import ThemeContext from "../context/ThemeContext";
import ThemeProvider from '../providers/ThemeProvider'

import navStyle from './NavBar.module.scss'

class NavBar extends Component {

    render (){
        return( 

            <ThemeContext>{
                (context)=> (
                <div className={navStyle['nav-bar']} style={{backgroundColor: context.state.theme.topBarColor}} >
                <p>{JSON.stringify(context.state)}</p>
                </div>)
            }
            </ThemeContext>

        )
    }
}

export default NavBar;
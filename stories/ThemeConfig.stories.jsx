import React, { Component } from 'react'
import styled from 'styled-components';
import {Motion, spring, StaggeredMotion} from 'react-motion';

import { TweenMax, TweenLite } from 'gsap'
import { morphSVG, MorphSVGPlugin} from '../models/MorphSVGPlugin'




class ThemeConfig extends Component {

  constructor(props){
    super(props)
    this.outsideCircle =  React.createRef();
  }
  state={
    red: false
  }

  handleHover = () => {
    console.log("hovering")
    let outsideCircle = document.getElementById("outsideCircle")
    this.state.red
      ?TweenMax.to(outsideCircle, 1, {fill:"white",  attr:{r:75}} )
      :TweenMax.to(outsideCircle, 1, {fill:"blue", attr:{r:150}} )
    this.setState({ red: !this.state.red})
  }
  
  handleClick = () => {
    let rect = document.getElementById("rect")
    let outsideCircle = document.getElementById("outsideCircle")
    TweenLite.to( outsideCircle, 1, {morphSVG:"240,220 240,70 70,70 70,220"})
    console.log(outsideCircle, "HERE")
  }

  render (){
    return( 
      <div className='ThemeConfig'>
        <button onClick={ this.handleHover }>click me</button>

        <svg 
        style={{width:"50%", height:"50%"}}
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 500">
          <circle 
          onMouseEnter={ this.handleHover}
          onMouseLeave={ this.handleHover}
          onClick={ this.handleClick}
          id="outsideCircle"
          cx="0" cy="250" r="75" stroke="grey" strokeWidth="3" fill="powderblue" />
          <circle id="rect" cx="0" cy="250" r="50" stroke="grey" strokeWidth="3" fill="white" />

          <rect 
          
          style={{visibility:"hidden"}} width="300" height="100" fill="green" />
        
        </svg>
      </div>
    )
  }
}

export default ThemeConfig;
/* 

<svg xmlns="http://www.w3.org/2000/svg" viewBox="150 0 400.25 500.5">
      
      <g id="Layer_2" data-name="Layer 2">
      <g id="hover">
      
      { <path d="M248.6 94.61a43.17 43.17 0 0 1-3.07 7.45 75.29 75.29 0 0 1-4 6.9c-1.45 2.23-3 4.39-4.59 6.57l-4.66 6.52c-6.18 8.72-12.49 17.36-18.79 26s-12.71 17.23-19.19 25.77-13 17.06-19.74 25.45c4-10 8.23-19.85 12.5-29.68s8.65-19.61 13-29.37 8.88-19.47 13.45-29.13l3.4-7.26c1.14-2.42 2.24-4.86 3.47-7.22a75.29 75.29 0 0 1 4-6.89 43.17 43.17 0 0 1 5-6.33zM322.81 193.12a43.29 43.29 0 0 1-7.13 3.78 75.52 75.52 0 0 1-7.51 2.75c-2.55.79-5.15 1.44-7.73 2.13l-7.76 2c-10.34 2.77-20.73 5.39-31.11 8s-20.81 5.15-31.27 7.59-20.93 4.84-31.49 7c9.48-5.13 19-10 28.62-14.88s19.2-9.58 28.83-14.28 19.3-9.32 29-13.84l7.26-3.42c2.42-1.13 4.83-2.31 7.29-3.34a75.5 75.5 0 0 1 7.52-2.72 43.29 43.29 0 0 1 7.89-1.69zM315.52 313.31a43 43 0 0 1-7.91-1.45 75 75 0 0 1-7.57-2.5c-2.48-1-4.91-2.06-7.36-3.12l-7.33-3.2c-9.79-4.23-19.53-8.61-29.28-13s-19.45-8.85-29.13-13.42-19.35-9.17-28.94-14c10.58 1.84 21.09 3.93 31.58 6.06s20.94 4.39 31.38 6.66 20.85 4.64 31.23 7.1l7.79 1.82c2.6.61 5.21 1.18 7.77 1.9a75 75 0 0 1 7.56 2.52 43 43 0 0 1 7.21 3.57zM229.83 403a42.5 42.5 0 0 1-4.69-6.48 74.11 74.11 0 0 1-3.71-7c-1.12-2.39-2.11-4.86-3.13-7.3l-3.06-7.34c-4.11-9.77-8.09-19.62-12.08-29.45s-7.86-19.73-11.66-29.67-7.57-19.89-11.11-30c6.34 8.59 12.45 17.31 18.52 26s12 17.53 18 26.34 11.78 17.66 17.55 26.56l4.35 6.66c1.44 2.22 2.93 4.42 4.27 6.7a74.11 74.11 0 0 1 3.69 7 42.51 42.51 0 0 1 2.72 7.52z"/> }
      <path d="M150 391.25c-82.16 0-149-66.84-149-149s66.84-149 149-149 149 66.84 149 149-66.84 149-149 149zm0-200a51 51 0 1 0 51 51 51.06 51.06 0 0 0-51-51z" fill="#fff"/>
      <path d="M150 94.25A148 148 0 1 1 45.35 137.6 147 147 0 0 1 150 94.25m0 200a52 52 0 1 0-52-52 52.06 52.06 0 0 0 52 52m0-202a150 150 0 1 0 150 150 150 150 0 0 0-150-150zm0 200a50 50 0 1 1 50-50 50 50 0 0 1-50 50z"/>
      
      </g></g>
      </svg> */
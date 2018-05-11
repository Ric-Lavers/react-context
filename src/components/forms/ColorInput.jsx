import React, { Component, Fragment }from 'react'
import {TwitterPicker, SketchPicker, SliderPicker } from 'react-color';

import styles from './ColorInput.module.scss';
import bs from '../../style/bootstrap.module.css'

class ColorInput extends Component{
  state = {
    showPicker: false
  }
  render(){
    let { onChange, color, text, name, value} = this.props
    let { showPicker } = this.state
    let pickerDisplay = showPicker?{display:'block'}:{display:'none'}
    return (
      <div 
      style={{marginBottom:16}} >
            {text}
            <div className={styles["flex-start"]} style={{position:'relative'}} >
              <input 
              className={bs["form-control"]}
              name={ name }
              value={  value }
              type="text"
              onChange={ onChange }
              placeholder={ color }
              />
              <div 
              onClick={ ()=> this.setState({ showPicker: !showPicker }) }
              className={styles['preview-color']} style={{backgroundColor:color}} >
              </div>
              <div style={Object.assign({}, pickerDisplay,{
                zIndex:100,
                position: 'absolute',
                top:-40,
                right:-100
                })} >
                <TwitterPicker
                />
              </div>
            </div>
          </div>
    )
  }
}

export default ColorInput
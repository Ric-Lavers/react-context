import React from 'react'

import styles from './ColorInput.module.scss';
import bs from '../../style/bootstrap.module.css'

const ColorInput = ( {onChange, color, text, name, value} ) => {
  return (
    <div style={{marginBottom:16}} >
          {text}
          <div className={styles["flex-start"]} >
            <input 
            className={bs["form-control"]}
            name={ name }
            value={  value }
            type="text"
            onChange={ onChange }
            placeholder={ color }
            />
            <div className={styles['preview-color']} style={{backgroundColor:color}} ></div>
          </div>
        </div>
  )
}

export default ColorInput
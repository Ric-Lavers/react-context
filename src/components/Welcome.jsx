import React from 'react'
import Modal from 'react-modal'

import ThemeContext from './context/ThemeContext'
import ColorInput from './forms/ColorInput'

import welcomeStyle from './Welcome.module.scss'

const modalStyles = {
    content : {
      top                   : '70%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      zIndex: 1000000
    }
  };


class Welcome extends React.Component {

    render (){
        return( 
            <div className='Welcome'>
            <ThemeContext>{
                (context)=>(
                <div>
                    <div
                    className={welcomeStyle.container}
                    onClick= { context.toggleModal } >
                      <p>theme</p>
                    </div>                    
                <Modal
                    ariaHideApp={false}
                    isOpen={context.state.openModal}
                    onRequestClose={context.closeModal}
                    style={modalStyles}
                    contentLabel="Example Modal">
                    <div>
                        <h2>Set Theme</h2>
                        <div style={{paddingBottom:32}} >
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.theme.bodyColor}
                            text= "Body Color"
                            name= 'bodyColor'
                            value={context.state.theme.bodyColor}
                            />
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.theme.topBarColor}
                            text= "Top Bar Color"
                            name= 'topBarColor'
                            value={context.state.theme.topBarColor}
                            />
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.theme.primaryColor}
                            text= "Primary Color"
                            name= 'primaryColor'
                            value={context.state.theme.primaryColor}
                            />
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.theme.secondaryColor}
                            text= "Secondary Color"
                            name= 'secondaryColor'
                            value={context.state.theme.secondaryColor}
                            />
                        </div>
                        <input 
                        className="btn btn-secondary"
                        onClick={context.closeModal} type="button" value="close"/>

                    </div>
                </Modal>
                </div>)}
            </ThemeContext>
            </div>
        )
    }
}

export default Welcome;
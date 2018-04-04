import React from 'react'
import Modal from 'react-modal'

import ThemeContext from './context/ThemeContext'
import ColorInput from './forms/ColorInput'

const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Welcome extends React.Component {


    render (){
        let { open, closeModal } = this.props
        return( 
            <div className='Welcome'>
            <ThemeContext>{
                (context)=>(
                <Modal
                    ariaHideApp={false}
                    isOpen={open}
                    onRequestClose={closeModal}
                    style={modalStyles}
                    contentLabel="Example Modal">
                    <div>
                        <h2>Set Theme</h2>
                        <p>{JSON.stringify(context.state)}</p>
                        <div style={{width:'50%', paddingBottom:32}} >
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.bodyColor}
                            text= "Body Color"
                            name= 'bodyColor'
                            value={context.state.bodyColor}
                            />
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.topBarColor}
                            text= "Top Bar Color"
                            name= 'topBarColor'
                            value={context.state.topBarColor}
                            />
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.primaryColor}
                            text= "Primary Color"
                            name= 'primaryColor'
                            value={context.state.primaryColor}
                            />
                            <ColorInput
                            onChange ={context.handleChange}
                            color= {context.state.secondaryColor}
                            text= "Secondary Color"
                            name= 'secondaryColor'
                            value={context.state.secondaryColor}
                            />
                        </div>
                        <input 
                        className="btn btn-secondary"
                        onClick={closeModal} type="button" value="close"/>

                    </div>
                </Modal>)}
            </ThemeContext>
            </div>
        )
    }
}

export default Welcome;
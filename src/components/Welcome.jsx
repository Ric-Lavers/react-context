import React from 'react'
import Modal from 'react-modal'

import ThemeContext from './context/ThemeContext'

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

    state ={
        isOpen:true,
        
    }
    
    closeModal = () => {
        this.setState({ isOpen: false })
    }

    render (){
        let { isOpen } = this.state
        return( 
            <div className='Welcome'>
            <ThemeContext>{
                (context)=>(
                <Modal
                    ariaHideApp={false}
                    isOpen={isOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                    contentLabel="Example Modal">
                    <div>
                        <h2>Set Theme</h2>
                        <p>{JSON.stringify(context.state)}</p>

                        <input 
                        className="btn btn-secondary"
                        onClick={this.closeModal} type="button" value="close"/>

                    </div>
                </Modal>)}
            </ThemeContext>
            </div>
        )
    }
}

export default Welcome;
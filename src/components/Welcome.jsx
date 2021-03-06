import React, { Component } from "react";
import Modal from "react-modal";

import ThemeContext from "./context/ThemeContext";
import ColorInput from "./forms/ColorInput";

import welcomeStyle from "./Welcome.module.scss";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000000
  }
};

const showPicker = (Children) => {
    return class extends Component{
        state = {
            showPicker: false
          };
        
        offPick = () => {
            console.log("off picker");
            this.state.showPicker === true && this.setState({ showPicker: false });
        };

        render(){
            return(
                <Children
                offPick = {this.offPick}
                showPicker = {this.state.showPicker}
                {...this.props}
                />
            )
        }
    }
}
const ColorPicker = showPicker(ColorInput)

class Welcome extends React.Component {
  
  render() {
    let { context } = this.props
    return (
      <div className="Welcome">
        <div>
          <div
            className={welcomeStyle.container}
            onClick={context.toggleModal}>
            <p>theme</p>
          </div>
          
          <Modal
            ariaHideApp={false}
            isOpen={context.state.openModal}
            onRequestClose={context.closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
          >
            <div>
              <h2>Set Theme</h2>
              <div style={{ paddingBottom: 32 }}>
                <ColorInput
                  onChange={context.handleChange}
                  color={context.state.theme.bodyColor}
                  text="Body Color"
                  name="bodyColor"
                  value={context.state.theme.bodyColor}
                />
                <ColorInput
                  onChange={context.handleChange}
                  color={context.state.theme.topBarColor}
                  text="Top Bar Color"
                  name="topBarColor"
                  value={context.state.theme.topBarColor}
                />
                <ColorInput
                  onChange={context.handleChange}
                  color={context.state.theme.primaryColor}
                  text="Primary Color"
                  name="primaryColor"
                  value={context.state.theme.primaryColor}
                />
                <ColorInput
                  onChange={context.handleChange}
                  color={context.state.theme.secondaryColor}
                  text="Secondary Color"
                  name="secondaryColor"
                  value={context.state.theme.secondaryColor}
                />
              </div>
              <input
                className="btn btn-secondary"
                onClick={context.closeModal}
                type="button"
                value="close"
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Welcome;

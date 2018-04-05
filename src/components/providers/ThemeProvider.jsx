import React, { Component } from "react";
import ThemeContext from "../context/ThemeContext";

class ThemeProvider extends Component {
  state = {
		theme:{
			topBarColor: "#E1DCD3",
			bodyColor: "#C4B086",
			primaryColor: "#FFF",
			secondaryColor: "#000"
		},
    openModal: true
  };
  componentDidMount() {
    if (localStorage.getItem("theme")) {
      const theme = JSON.parse(localStorage.getItem("theme") );
			this.setState({theme})
    }
  }
  handleChange = event => {
		let { theme } = this.state
		let { name, value } = event.target;
		theme[name] = value
    this.setState({ theme });
    localStorage.setItem("theme", JSON.stringify(theme));
  };
  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  closeModal = () => {
    this.setState({ openModal: false });
  };
  render() {
    return (
      <ThemeContext.Provider
        value={{
          state: this.state,
          handleChange: this.handleChange,
          toggleModal: this.toggleModal,
          closeModal: this.closeModal
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;

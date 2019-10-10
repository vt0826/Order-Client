import React from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
    };
  }

  componentDidMount() {
    // console.log("mount:");
    // console.log(this.props.isActive);
    //this.setState({ isActive: true});

  }

  componentWillUnmount() {
  }

  render() {
    return createPortal(
      <StyledModalWrapper className={this.state.isActive ? 'active' : ''}>
        {this.props.children}
      </StyledModalWrapper>
      , document.getElementById('modalRoot')
    );
  }
}

export default Modal;

// Styled Components
const StyledModalWrapper = styled.section`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 99;
`;

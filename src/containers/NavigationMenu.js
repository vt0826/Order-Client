import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '@reach/router';
import styled from 'styled-components';
import firebase from "../firebase";

// Component
import {SignOutMenuLinks, SignInMenuLinks} from '../components/Navigation';

// Redux
import {signOutAccount} from '../actionCreaters/accountAction';


class NavigationMenu extends React.Component {
  renderNavs() {
    if (this.props.account.email) {
      return (
        <SignInMenuLinks handleSignOut={this.props.handleSignOut}/>
      );
    } else {
      return <SignOutMenuLinks />;
    }
  }
  render() {
    return (
      <StyledNavMenuContainer className={this.props.className}>
        <StyledNavMenu>{this.renderNavs()}</StyledNavMenu>
      </StyledNavMenuContainer>
    );
  }
}

const mapStateToProps = ({
  account,
  header
}) => {
  return {
    account,
  };
};

const mapDispatchToProps = dispatch => ({
  handleSignOut() {
    console.log('Sign out user from firebase');
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        console.log('Congrats', "You've signed out successfully!");
        dispatch(signOutAccount());
        navigate('/');
      })
      .catch(function(error) {
        // An error happened.
      });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationMenu);

// Styled Components
const StyledNavMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  opacity: 0;
  height: 0;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
  transition: opacity 0.36s cubic-bezier(0.32, 0.08, 0.24, 1),
    height 0.56s cubic-bezier(0.52, 0.16, 0.24, 1);

  &.active {
    opacity: 1;
    height: 100vh;
  }
`;

const StyledNavMenu = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 17px 0;
`;

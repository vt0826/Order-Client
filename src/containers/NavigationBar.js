import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '@reach/router';
import styled from 'styled-components';
import firebase from '../firebase';

// Redux
import {signOutAccount} from '../actionCreaters/accountAction';

// Components
import {SignInBarLinks, SignOutBarLinks} from '../components/Navigation';

class NavigationBar extends React.Component {
  renderNavs() {
    if (this.props.account.email) {
      return <SignInBarLinks handleSignOut={this.props.handleSignOut} />;
    } else {
      return <SignOutBarLinks />;
    }
  }
  render() {
    return (
      <StyledNavBarContainer>
        <StyledNavBar>{this.renderNavs()}</StyledNavBar>
      </StyledNavBarContainer>
    );
  }
}

const mapStateToProps = ({account}) => {
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
)(NavigationBar);

// Styled Components
const StyledNavBarContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledNavBar = styled.ul`
  display: none;
  list-style: none;
  padding-left: 0;
  margin: 13px 0;

  @media (min-width: 600px) {
    display: flex;
  }
`;

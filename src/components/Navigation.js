import React from 'react';
import {Link} from '@reach/router';
import styled from 'styled-components';
import {connect} from 'react-redux';

// Redux
import {toggleMenu} from '../actionCreaters/headerAction';

// Style
import {DisplayMedium, TextMedium} from '../components/Typography';

class SignOutBarLinks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StyledListItemTextMedium as="li">
          <Link to="signup">Sign up</Link>
        </StyledListItemTextMedium>
        <StyledListItemTextMedium as="li">
          <Link to="sign-in">Sign In</Link>
        </StyledListItemTextMedium>
      </React.Fragment>
    );
  };
}

class SignInBarLinks extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StyledListItemTextMedium as="li">
          <Link to="/campaigns" >Campaigns</Link>
        </StyledListItemTextMedium>
        <StyledListItemTextMedium as="li">
          <Link to="/host">Host</Link>
        </StyledListItemTextMedium>
        <StyledListItemTextMedium as="li">
          <Link to="/orders">Orders</Link>
        </StyledListItemTextMedium>
        {/*
        <StyledListItemTextMedium as="li">
          <Link to={'/account/' + this.props.userNameId}>Account</Link>
        </StyledListItemTextMedium>
        */}
        <StyledListItemTextMedium as="li" onClick={this.props.handleSignOut}>
          Sign Out
        </StyledListItemTextMedium>
      </React.Fragment>
    )
  };
}

class SignOutMenu extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StyledListItemDisplayMedium as="li">
          <Link to="signup" onClick={this.props.handleMenu}>Sign up</Link>
        </StyledListItemDisplayMedium>
        <StyledListItemDisplayMedium as="li">
          <Link to="sign-in" onClick={this.props.handleMenu}>Sign In</Link>
        </StyledListItemDisplayMedium>
      </React.Fragment>
    );
  };
}

class SignInMenu extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StyledListItemDisplayMedium as="li" onClick={this.props.handleMenu}>
          <Link to="/campaigns" >Campaigns</Link>
        </StyledListItemDisplayMedium>
        <StyledListItemDisplayMedium as="li" onClick={this.props.handleMenu}>
          <Link to="/host">Host</Link>
        </StyledListItemDisplayMedium>
        <StyledListItemDisplayMedium as="li" onClick={this.props.handleMenu}>
          <Link to="/orders">Orders</Link>
        </StyledListItemDisplayMedium>
        {/*
        <StyledListItemDisplayMedium as="li" onClick={this.props.handleMenu}>
          <Link to={'/account/' + this.props.userNameId}>Account</Link>
        </StyledListItemDisplayMedium>
        */}
        <StyledListItemDisplayMedium as="li" onClick={() => { this.props.handleMenu(); this.props.handleSignOut(); }}>
          Sign Out
        </StyledListItemDisplayMedium>
      </React.Fragment>
    )
  };
}

const mapStateToProps = ({
  headerMenuDisplay
}) => {
  return {
    headerMenuDisplay
  };
};
const mapDispatchToProps = dispatch => ({
  handleMenu(){
    dispatch(toggleMenu());
  },
});


export const SignOutMenuLinks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignOutMenu);

export const SignInMenuLinks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInMenu);

export {SignOutBarLinks, SignInBarLinks};

// Styled Components
const StyledListItemTextMedium = styled(TextMedium)`
  margin: 0 10px;

  a {
    color: #000;
    text-decoration: none;
    text-transform: capitalize;
  }
`;

const StyledListItemDisplayMedium = styled(DisplayMedium)`
  margin: 20px 0;
  text-align: center;

  :first-child {
    margin: 0;
  }

  a {
    color: #000;
    text-decoration: none;
    text-transform: capitalize;
  }
`;

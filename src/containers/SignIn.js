import React from 'react';
import {navigate} from '@reach/router';
import {connect} from 'react-redux';
import styled from 'styled-components';
import firebase from '../firebase';

// Redux
import {signInAccount} from '../actionCreaters/accountAction';


// Style
import {
  DisplayMedium,
  DisplayXSmall,
  TextXLarge,
} from '../components/Typography';

/***********************************************************************/
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthSuccessful: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.account !== prevProps.account) {
      if (
        this.state.isAuthSuccessful &&
        this.props.account &&
        this.props.campaignId
      ) {
        navigate('/campaign/' + this.props.campaignId);
      } else if (this.state.isAuthSuccessful && this.props.account) {
        navigate('/campaigns');
      }
    }
  }

  handleEmail = event => {
    this.setState({email: event.target.value});
  };

  handlePassword = event => {
    this.setState({password: event.target.value});
  };

  handleFirebaseSignIn = () => {
    console.log('Firebase Auth');
    const email = this.state.email;
    const password = this.state.password;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Error message
        console.log('Error', error.message);
      })
      .then(response => {
        if (response) {
          console.log(response.user.displayName);
          // Successful
          this.setState({isAuthSuccessful: true});
          setTimeout(() => {
            console.log('Congrats', "You've logged in successfuly!");
            this.props.handleAccount(
              this.state.email,
              response.user.displayName,
            );
          }, 1000);
        }
      });
  };

  //render the sign-in form and query sign-in status base on the user's input
  render() {
    return (
      <StyledContainer className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <StyledDisplayMedium>Welcome back</StyledDisplayMedium>
            <StyledForm>
              <StyledDisplayXSmall>Email</StyledDisplayXSmall>
              <StyledInput
                as="input"
                type="text"
                placeholder="your@email.com"
                onChange={this.handleEmail}
              />

              <StyledDisplayXSmall>Password</StyledDisplayXSmall>
              <StyledInput
                as="input"
                type="password"
                placeholder="******"
                onChange={this.handlePassword}
              />

              <StyledSubmitButton
                as="button"
                onClick={this.handleFirebaseSignIn}>
                Sign In
              </StyledSubmitButton>
            </StyledForm>
          </div>
        </div>
      </StyledContainer>
    );
  }
}

//const mapStateToProps = ({account, sessionToken}) => ({account, sessionToken});

const mapStateToProps = ({account}) => ({
  account,
});

const mapDispatchToProps = dispatch => ({
  handleAccount(email, displayName) {
    const payload = {email: email, displayName: displayName};
    dispatch(signInAccount(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);

// Styled components
const StyledContainer = styled.section`
  padding-top: 120px;
  padding-bottom: 70px;
`;

const StyledDisplayMedium = styled(DisplayMedium)`
  margin: 0;
`;

const StyledForm = styled.div`
  padding: 40px;
  background: #f6f6f6;
  margin: 40px 0 0 0;
  color: #4e4e4e;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0 20px 0 0;
`;

const StyledInput = styled(TextXLarge)`
  display: inline-block;
  width: 100%;
  background: transparent;
  height: 32px;
  color: #000;
  font-size: 13.33px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.8px;
  padding: 8px 0;
  margin-bottom: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #4e4e4e;
`;

const StyledSubmitButton = styled(DisplayXSmall)`
  padding: 8px 20px;
  background: none;
  color: #4e4e4e;
  border: 1px solid #4e4e4e;
  margin: 20px 0 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

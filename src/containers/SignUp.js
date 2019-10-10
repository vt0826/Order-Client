import React from 'react';
import {Link} from '@reach/router';
import {Mutation} from 'react-apollo';
import {connect} from 'react-redux';
import {navigate} from '@reach/router';
import gql from 'graphql-tag';
import styled from 'styled-components';
import firebase from '../firebase';

// Redux
import {createAccount} from '../actionCreaters/accountAction';

// Style
import {
  DisplayMedium,
  DisplayXSmall,
  TextXLarge,
  TextMedium
} from '../components/Typography';

const NEW_ACCOUNT = gql`
  mutation newAccount($email: String!, $displayName: String!) {
    newAccount(input: {email: $email, displayName: $displayName}) {
      status
      message
    }
  }
`;

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayName: '',
      campaignId: this.props.campaignId,
      isAuthSuccessful: false,
    };
  }

  //redirect to the dashboard if both account and sessionToken are being created and updated.
  componentDidUpdate(prevProps) {
    if (this.props.account !== prevProps.account) {
      if (
        this.state.isAuthSuccessful &&
        this.props.account &&
        this.props.campaignId
      ) {
        //   navigate('/campaign/' + this.props.campaignId);
      } else if (this.state.isAuthSuccessful && this.props.account) {
        //  navigate('/campaigns');
      }
    }
  }

  //update forms's corresponding state
  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  handleFirebaseSignup = event => {
    event.preventDefault();
    const {email, password, displayName} = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Error message
        console.log('Error', error.message);
      })
      .then(response => {
        if (response) {
          response.user
            .updateProfile({
              displayName: displayName,
            })
            .then(function() {
              // Update successful.
              console.log('success add name');
            })
            .catch(function(error) {
              // An error happened.
            });

          // Successful
          this.setState({isAuthSuccessful: true});
          setTimeout(() => {
            console.log('Congrats', "You've signed up successfuly!");
            console.log(this.state.email, this.state.displayName);
            this.props.addNewAccount({
              variables: {
                email: this.state.email,
                displayName: this.state.displayName,
              },
            });

            this.props.createAccount(this.state.email, this.state.displayName);
          }, 1000);
        }
      });
  };

  render() {
    return (
      <StyledContainer className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <StyledDisplayMedium>Let's help you sign up a new account</StyledDisplayMedium>
            <StyledForm as="form" onSubmit={this.handleFirebaseSignup}>
              <StyledDisplayXSmall className="inputLabel">
                Email
              </StyledDisplayXSmall>
              <StyledInput
                as="input"
                type="text"
                name="email"
                placeholder=""
                onChange={this.handleInputChange}
              />
              <StyledDisplayXSmall className="inputLabel">
                Password
              </StyledDisplayXSmall>
              <StyledInput
                as="input"
                type="password"
                name="password"
                placeholder=""
                onChange={this.handleInputChange}
              />
              <StyledDisplayXSmall className="inputLabel">
                Display Name
              </StyledDisplayXSmall>
              <StyledInput
                as="input"
                name="displayName"
                placeholder=""
                onChange={this.handleInputChange}
              />
              <StyledSubmitButton as="button">
                Sign up
              </StyledSubmitButton>
              <TextMedium>
                <Link to={'/sign-in/' + this.props.campaignId}>
                  Already have Thyhive account ?{' '}
                </Link>
              </TextMedium>
            </StyledForm>
          </div>
        </div>
      </StyledContainer>
    );
  }
}

class SignUpHOC extends React.Component {
  render() {
    return (
      <Mutation
        mutation={NEW_ACCOUNT}
        onCompleted={data => {
          if (this.props.campaignId) {
            navigate('/campaign/' + this.props.campaignId);
          } else {
            navigate('/campaigns');
          }
        }}>
        {(newAccount, {data}) => <SignUpFormPage addNewAccount={newAccount} />}
      </Mutation>
    );
  }
}

const mapStateToProps = ({account}) => ({
  account,
});

const mapDispatchToProps = dispatch => ({
  //disptach createAccount action to update the account reducer and createSessionToken to update the session token reducer
  createAccount(email, displayName) {
    const payload = {email: email, displayName: displayName};
    dispatch(createAccount(payload));
  },
});
export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpHOC);

export const SignUpFormPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);

// Styled components
const StyledContainer = styled.section`
  padding-top: 120px;
  padding-bottom: 70px;
`;

const StyledDisplayMedium = styled(DisplayMedium)`
  margin: 0;
`;

const StyledForm = styled.form`
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
  width: 100%;
  padding: 8px 20px;
  background: none;
  color: #4e4e4e;
  border: 1px solid #4e4e4e;
  margin: 20px 0 16px 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

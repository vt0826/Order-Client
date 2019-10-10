/*
import React from 'react';
import {connect} from 'react-redux';
import {getAccount} from '../actionCreaters/accountAction';
import {AccountInfo} from '../components/AccountInfo';
import CamapignsIndexContainer from '../containers/CampignsIndexContainer';
//import CampaignCreateContainer from '../containers/CampaignCreateContainer';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queryStringObject: {
        email: this.props.session.email,
        token: this.props.session.id,
      },
    };
  }

  //get account info from getAccount action
  componentDidMount() {
    this.props.getAccount(this.state.queryStringObject);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.campaignsIndex !== this.props.campaignsIndex) {
      this.props.getAccount(this.state.queryStringObject);
    }
  }

  render() {
    if (!this.props.account) return null;
    return (
      <div>
        <AccountInfo account={this.props.account} />
        <hr />
        <h5>YOUR CAMPAIGNS </h5>
        {this.props.account.campaigns.length > 0 && (
          <CamapignsIndexContainer
            campaignsIndex={this.props.account.campaigns}
          />
        )}
        <hr />

        <h5>YOUR HOST CAMPAIGNS: </h5>
        <CamapignsIndexContainer
          campaignsIndex={this.props.account.hostCampaign}
        />

        <hr />
        <CampaignCreateContainer email={this.props.account.email} />
      </div>
    );
  }
}

const mapStateToProps = ({session, account, message, privilage}) => {
  return {
    session,
    account,
    message,
    privilage,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch getAccount action to obtain account info from server call
  getAccount(queryStringObject) {
    dispatch(getAccount(queryStringObject));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);

*/

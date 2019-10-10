import React from 'react';
import {Mutation} from 'react-apollo';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import gql from 'graphql-tag';

// Redux
import {setCampaign} from '../actionCreaters/campaignAction';

// Components
import CampaignDetail from './CampaignDetail';

// GraphQL
const CAMPAIGN = gql`
  query campaign($campaignId: ID!) {
    campaign(campaignId: $campaignId) {
      id
      name
      fulfillReq
      detail
      expiration
      pickupTime
      pickupAddress
      members {
        email
        displayName
      }
      host {
        email
        displayName
      }
      listItems {
        id
        name
        price
        pictures {
          url
        }
        variants {
          option
        }
      }
    }
  }
`;

const ADD_MEMBER = gql`
  mutation addMember($campaignId: ID!, $email: String!) {
    addMember(campaignId: $campaignId, input: {members: {email: $email}}) {
      status
      message
      id
    }
  }
`;

/****************************************************************/
class Campaign extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const campaignId = this.props.campaignId;
    const email = this.props.account.email;
    return (
      <Query
        query={CAMPAIGN}
        variables={{campaignId}}
        fetchPolicy="no-cache"
        onCompleted={data => this.props.setCampaign(data.campaign)}>
        {({loading, error, data}) => {
          if (loading) return null;
          if (error) return `Error! ${error}`;
          return (
            <Mutation mutation={ADD_MEMBER} variables={{campaignId, email}}>
              {(addMember, {data, loading, error}) => (
                <CampaignDetail
                  addMember={addMember}
                  campaignId={this.props.campaignId}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = ({sessionToken, account, campaign}) => {
  return {
    sessionToken,
    account,
    campaign,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setCampaign action to set campaign reducer
  setCampaign(campaign) {
    dispatch(setCampaign(campaign));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Campaign);

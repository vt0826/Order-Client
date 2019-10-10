import React from 'react';
import {Mutation} from 'react-apollo';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {navigate} from '@reach/router';

// Redux
import {
  setCampaign,
  updateCampaign,
} from '../actionCreaters/campaignAction';

// Components
import {CampaignForm} from '../components/CampaignForm';

// Style
import {DisplayXSmall} from '../components/Typography';

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
      }
      listItems {
        id
        price
        name
        pictures {
          url
        }
      }
    }
  }
`;

const UPDATE_CAMPAIGN = gql`
  mutation updateCampaign(
    $campaignId: ID!
    $name: String!
    $fulfillReq: Float!
    $expiration: Date!
    $pickupTime: Date!
    $pickupAddress: String!
  ) {
    updateCampaign(
      campaignId: $campaignId
      input: {
        name: $name
        fulfillReq: $fulfillReq
        expiration: $expiration
        pickupTime: $pickupTime
        pickupAddress: $pickupAddress
      }
    ) {
      status
      message
    }
  }
`;


/************************************************************/
class CampaignEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaign: this.props.campaign,
    };
  }

  //update forms' corresponding props
  handleInput = (field, event) => {
    const campaign = {field: field, value: event.target.value};
    this.props.updateCampaign(campaign);
  };

  renderCampaignEdit() {
    const campaignId = this.props.campaignId;
    const name = this.props.campaign.name;
    const fulfillReq = parseFloat(this.props.campaign.fulfillReq);
    const expiration = this.props.campaign.expiration;
    const pickupTime = this.props.campaign.pickupTime;
    const pickupAddress = this.props.campaign.pickupAddress;

    return (
      <React.Fragment>
        <CampaignForm
          handleInput={this.handleInput}
          campaign={this.props.campaign}
        />
        <Mutation
          mutation={UPDATE_CAMPAIGN}
          variables={{
            campaignId,
            name,
            fulfillReq,
            expiration,
            pickupTime,
            pickupAddress,
          }}
          refetchQueries={() => [
            {
              query: CAMPAIGN,
              variables: {campaignId},
            },
          ]}
          onCompleted={data => {
            if (data) {
              //this.props.setCampaign(this.state.campaign);
              navigate('/manage/' + campaignId + '/product');
            }
          }}>
          {(updateCampaign, {data, loading, error}) => (
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <StyledDisplayXSmall onClick={updateCampaign}>
                  Update Campaign & Next
                </StyledDisplayXSmall>
              </div>
            </div>
          )}
        </Mutation>
      </React.Fragment>
    );
  }

  render() {
    const campaignId = this.props.campaignId;

    return (
      <Query
        query={CAMPAIGN}
        variables={{campaignId}}
        fetchPolicy="no-cache"
        onCompleted={data => this.props.setCampaign(data.campaign)}>
        {({loading, error, data}) => {
          if (loading) return <div>loading</div>;
          if (error) return <div>error</div>;
          return <React.Fragment>{this.renderCampaignEdit()}</React.Fragment>;
        }}
      </Query>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  campaign,
  campaignsRefetchRequire,
}) => {
  return {
    sessionToken,
    account,
    campaign,
    campaignsRefetchRequire,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setCampaign action to set campaign reducer
  setCampaign(campaign) {
    dispatch(setCampaign(campaign));
  },
  updateCampaign(campaign) {
    dispatch(updateCampaign(campaign));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignEdit);

/*************************************************************
** Styled Components
*/
const StyledDisplayXSmall = styled(DisplayXSmall)`
  width: 100%;
  background: #000;
  color: #fff;
  padding: 8px 20px;
  text-align: center;
`;

import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Mutation} from 'react-apollo';
import {navigate} from '@reach/router';

// Redux
import {
  setHostCampaignsIndex,
  campaignsRefetchFinished,
} from '../actionCreaters/campaignAction';
import {
  setAccountItems,
  itemRefetchRequire,
  itemRefetchFinished,
} from '../actionCreaters/itemAction';

// Assets
import addCampaignImage from '../assets/add-item-image@2x.png';

// Components
import {HostCampaignsIndex} from '../components/HostCampaignsIndex';

// Style
import {TextXLarge} from '../components/Typography';

const HOSTCAMPAIGNS = gql`
  query hostCampaigns {
    hostCampaigns {
      id
      name
      fulfillReq
      detail
      expiration
      pickupTime
      pickupAddress
      listItems {
        id
        name
      }
    }
  }
`;
const NEW_CAMPAIGN = gql`
  mutation newCampaign {
    newCampaign {
      id
      status
      message
    }
  }
`;

class HostCampaign extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  redirectToCampaignPage(campaignId) {
    navigate('/manage/' + campaignId);
  }
  //illiterate through the campagins array and display them in campaignsIndex component
  renderIndex(campaigns) {
    if (!campaigns) return null;
    return campaigns.map(campaign => (
      <HostCampaignsIndex
        redirectToCampaignPage={this.redirectToCampaignPage}
        campaign={campaign}
      />
    ));
  }

  renderHostCampaign() {
    return (
      <Query
        query={HOSTCAMPAIGNS}
        fetchPolicy="no-cache"
        onCompleted={data =>
          this.props.setHostCampaignsIndex(data.hostCampaigns)
        }>
        {({loading, error, data}) => {
          if (loading) return <div>loading</div>;
          if (error) return <div>{alert(error)}</div>;
          return (
            <React.Fragment>
              <div className="row">
                <StyledCol className="col-md-6">
                  <Mutation
                    mutation={NEW_CAMPAIGN}
                    onCompleted={data => {
                      if (data) {
                        this.redirectToCampaignPage(data.newCampaign.id);
                      }
                    }}>
                    {(newCampaign, {data, loading, error}) => (
                      <StyledImage
                        src={addCampaignImage}
                        onClick={newCampaign}
                      />
                    )}
                  </Mutation>
                  <StyledTextXLarge> New campaign</StyledTextXLarge>
                </StyledCol>

                {this.renderIndex(this.props.hostCampaigns)}
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  render() {
    return <div>{this.renderHostCampaign()}</div>;
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  accountItems,
  itemRefetchRequire,
  campaignsIndex,
  hostCampaigns,
  campaignsRefetchRequire,
  joinedCampaigns,
}) => {
  return {
    sessionToken,
    account,
    accountItems,
    itemRefetchRequire,
    campaignsIndex,
    hostCampaigns,
    campaignsRefetchRequire,
    joinedCampaigns,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setHostCampaignsIndex to set host campaigns and dispatch hostCampaignsRefetchFinished
  setHostCampaignsIndex(campaigns) {
    dispatch(setHostCampaignsIndex(campaigns));
    dispatch(campaignsRefetchFinished());
  },

  //dispatch setAccountItems action to update accountItems reducer
  setAccountItems(items) {
    dispatch(setAccountItems(items));
    dispatch(itemRefetchFinished());
  },

  setItemfetchRequire() {
    dispatch(itemRefetchRequire());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HostCampaign);

/************************************************************
** Styled Components
*/
const StyledImage = styled.img`
  width: 100%;
  margin: 0 0 16px;
`;
const StyledCol = styled.div`
  margin: 0 0 40px 0;
`;
const StyledTextXLarge = styled(TextXLarge)`
  text-transform: capitalize;
`;

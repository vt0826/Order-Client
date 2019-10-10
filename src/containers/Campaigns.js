import React from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {navigate} from '@reach/router';
import styled from 'styled-components';

// Redux
import {
  setHostCampaignsIndex,
  setJoinedCampaignsIndex,
} from '../actionCreaters/campaignAction';

// Component
import {CampaignsIndex} from '../components/CampaignsIndex';

// Style
import {DisplaySmall, TextMedium} from '../components/Typography';

// GraphGL
const JOINEDCAMPAIGNS = gql`
  query joinedCampaigns {
    joinedCampaigns {
      id
      name
      fulfillReq
      detail
      expiration
      listItems {
        id
        name
      }
    }
  }
`;

/******************************************************************/
class Campaigns extends React.Component {
  constructor(props) {
    super(props);

    this.contentEditable = React.createRef();
    this.state = {
      loading: true,
      popoverOpen: false,
    };
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});

  redirectToCampaignPage(campaignId) {
    navigate('/campaign/' + campaignId);
  }

  //illiterate through the campagins array and display them in campaignsIndex component
  renderIndex(campaigns) {
    if (!campaigns || !campaigns.length) {
      return <TextMedium> No Joined Campaigns </TextMedium>;
    } else {
      return campaigns.map(campaign => (
        <CampaignsIndex
          redirectToCampaignPage={this.redirectToCampaignPage}
          campaign={campaign}
        />
      ));
    }
  }

  render() {
    return (
      <StyledMainContainer className="container">
        <StyledDisplaySmall>Campaigns</StyledDisplaySmall>
        <Query
          query={JOINEDCAMPAIGNS}
          fetchPolicy="cache-and-network"
          onCompleted={data =>
            this.props.setJoinedCampaignsIndex(data.joinedCampaigns)
          }>
          {({loading, error, data}) => {
            if (loading) return <div>loading</div>;
            if (error) return <div>error</div>;
            return (
              <div className="row">
                {this.renderIndex(this.props.joinedCampaigns)}
              </div>
            );
          }}
        </Query>
      </StyledMainContainer>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  campaignsIndex,
  hostCampaigns,
  joinedCampaigns,
}) => {
  return {
    sessionToken,
    account,
    campaignsIndex,
    hostCampaigns,
    joinedCampaigns,
  };
};

const mapDispatchToProps = dispatch => ({
  //dispatch setHostCampaignsIndex to set host campaigns
  setHostCampaignsIndex(campaigns) {
    dispatch(setHostCampaignsIndex(campaigns));
  },

  //dispatch setJoinedCampaignsIndex to set join campaigns
  setJoinedCampaignsIndex(campaigns) {
    dispatch(setJoinedCampaignsIndex(campaigns));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Campaigns);

/******************************************************************
** Styled Components
*/
const StyledMainContainer = styled.div`
  margin-top: 68px;
  margin-bottom: 68px;

  @media (min-width: 600px) {
    margin-top: 130px;
    margin-bottom: 130px;
  }
`;

const StyledDisplaySmall = styled(DisplaySmall)`
  margin-bottom: 20px;
`;

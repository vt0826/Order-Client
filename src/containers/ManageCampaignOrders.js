import React from 'react';
import {Query} from 'react-apollo';
import {navigate} from '@reach/router';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import styled from 'styled-components';

// Redux
import {setCampaignOrders} from '../actionCreaters/orderAction';

// Style
import {
  DisplayXSmall,
  TextLarge,
} from '../components/Typography';

// Asset
import NextIcon from '../assets/next@2x.png';

// GraphQL
const CAMPAIGN_ORDERS = gql`
  query campaignOrders($campaignId: ID!) {
    campaignOrders(campaignId: $campaignId) {
      id
      subTotal
      orderItems {
        item {
          name
        }
        variants {
          option
        }
        quantity
      }
      campaign {
        id
      }
      account {
        displayName
        email
      }
    }
  }
`;

class ManageCampaignOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  redirectToOrderPage(campaignId, orderId) {
    navigate('/manage/' + campaignId + '/' + orderId);
  }
  redirectToOrderSummayPage(campaignId) {
    navigate('/manage/' + campaignId + '/ordersummary');
  }

  renderOrderlist() {
    if (!this.props.campaignOrders.length) {
      return <div className="col-12">No Orders Yet</div>;
    }
    return this.props.campaignOrders.map(order => (
      <div className="col-md-6"
        onClick={() => this.redirectToOrderPage(order.campaign.id, order.id)}>
        <StyledOrder>
          <div className="row nested">
            <div className="col-10">
              <DisplayXSmall>
                ORDER {order.id}
              </DisplayXSmall>
              <TextLarge>{order.account.displayName}</TextLarge>
            </div>
            <div className="col-2">
              <StyledNextIcon src={NextIcon}/>
            </div>
          </div>
        </StyledOrder>
      </div>
    ));
  }

  render() {
    const campaignId = this.props.campaignId;
    return (
      <React.Fragment>
        <StyledOrderSummary className="col-12">
          <div className="row align-items-center" onClick={() => this.redirectToOrderSummayPage(campaignId)}>
            <div className="col-11">
              <StyledDisplayXSmall>
                CAMPAIGN ORDERS SUMMARY
              </StyledDisplayXSmall>
            </div>
            <div className="col-1">
              <StyledNextIcon src={NextIcon}/>
            </div>
          </div>
        </StyledOrderSummary>

        <div className="row">
          <Query
            query={CAMPAIGN_ORDERS}
            variables={{campaignId}}
            fetchPolicy="cache-and-network"
            onCompleted={data =>
              this.props.setCampaignOrders(data.campaignOrders)
            }>
            {({loading, error, data}) => {
              if (loading) return <div>loading</div>;
              if (error) return <div>error</div>;

              return this.renderOrderlist();
            }}
          </Query>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  campaign,
  campaignOrders,
  campaignsRefetchRequire,
}) => {
  return {
    sessionToken,
    account,
    campaign,
    campaignOrders,
    campaignsRefetchRequire,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setCampaign action to set campaign reducer
  setCampaignOrders(orders) {
    dispatch(setCampaignOrders(orders));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCampaignOrders);

/*
** Styled Components
*/
const StyledOrderSummary = styled.div`
  margin-top: 40px;
  background: #f8f8f8;
`;

const StyledOrder = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #dedede;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  text-transform: capitalize;
  padding: 20px;
`;

const StyledNextIcon = styled.img`
  width: 100%;
`;

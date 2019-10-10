import React from 'react';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import {navigate} from '@reach/router';
import gql from 'graphql-tag';
import styled from 'styled-components';

// Redux
import {setCampaignOrderSummary} from '../actionCreaters/orderAction';

// Assets
import BackIcon from '../assets/back@2x.png';

// Style
import {
  DisplayXSmall,
  TextXLarge,
  TextLarge,
  TextMedium,
  TextSmall,
  TextXSmall,
} from '../components/Typography';


const CheckVariant = props => {
  if (props.option === 'default') return null;

  return (
    <React.Fragment>
      <div className="col-2"> {props.option} </div>
    </React.Fragment>
  );
};

const OrderSummary = props => {
  return (
    <React.Fragment>
      <div className="row">
        {props.orderSummary.orderItems.map(order => (
          <div className="col-md-6">
            <div className="row nested">
              <div className="col-3">
                <StyledImage
                  src={require('../assets/placeholder/il_794xN.1460676349_4fpc.jpg')}
                  alt="default"
                />
              </div>
              <div className="col-7">
                <TextXLarge> {order.item.name}</TextXLarge>
                <CheckVariant option={order.option} />
                <TextSmall>
                  $ {order.item.price} {'/'} each
                </TextSmall>
                <TextXSmall> Quantity {order.quantity}</TextXSmall>
              </div>

              <div className="col-2">
                <div>${order.amount}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <StyledSummary>
        <TextXLarge>Summary</TextXLarge>
        <div className="row">
          <TextMedium className="col-1">Total</TextMedium>
          <TextMedium className="col-2">${props.orderSummary.totalAmount}</TextMedium>
        </div>
      </StyledSummary>
    </React.Fragment>
  );
};

const CAMPAIGN_ORDER_SUMMARY = gql`
  query campaignOrderSummary($campaignId: ID!) {
    campaignOrderSummary(campaignId: $campaignId) {
      totalAmount
      orderItems {
        quantity
        option
        amount
        variant
        item {
          name
          price
          pictures {
            url
          }
        }
      }
    }
  }
`;

class ManageOrderSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  redirectToOrderPage(campaignId, orderId) {
    navigate('/manage/' + campaignId + '/' + orderId);
  }

  redirectToCampaignOrderListPage(campaignId) {
    navigate('/manage/' + campaignId + '/orders');
  }

  render() {
    const campaignId = this.props.campaignId;
    return (
      <React.Fragment>
        <div className="col-12">
          <StyledDiv className="row align-items-center">
            <StyledDisplayXSmall className="col-6">
              CAMPAIGN ORDERS SUMMARY{' '}
            </StyledDisplayXSmall>

            <StyledBackLink className="col-6" onClick={() => this.redirectToCampaignOrderListPage(campaignId)}>
              <StyledBackIcon src={BackIcon}/>
              <StyledTextSmall>Back to order overview</StyledTextSmall>
            </StyledBackLink>
          </StyledDiv>
        </div>
        <Query
          query={CAMPAIGN_ORDER_SUMMARY}
          variables={{campaignId}}
          onCompleted={data =>
            this.props.setCampaignOrderSummary(data.campaignOrderSummary)
          }>
          {({loading, error, data}) => {
            if (loading) return <div>loading</div>;
            if (error) return <div>{alert(error)}</div>;

            return (
              <OrderSummary orderSummary={this.props.campaignOrderSummary} />
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  campaign,
  campaignOrders,
  campaignOrderSummary,
  campaignsRefetchRequire,
}) => {
  return {
    sessionToken,
    account,
    campaign,
    campaignOrders,
    campaignOrderSummary,
    campaignsRefetchRequire,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setCampaign action to set campaign reducer
  setCampaignOrderSummary(orderSummary) {
    dispatch(setCampaignOrderSummary(orderSummary));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageOrderSummary);

/*
** Styled components
*/
const StyledImage = styled.img`
  width: 100%;
`;

const StyledDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  background: #f8f8f8;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  text-transform: capitalize;
  padding: 20px;
  a {
    color: #000;
    text-decoration: none;
    text-transform: capitalize;
  }
`;

const StyledTextLarge = styled(TextLarge)`
  text-transform: capitalize;
  padding: 8px;
`;

const StyledOrderNumberDisplayXSmall = styled(DisplayXSmall)`
  padding: 8px;
  text-transform: capitalize;
  background: #f8f8f8;
`;

const StyledBackLink = styled.div`
  text-align: right;
`;

const StyledSummary = styled.div`
  margin: 40px 0;
`;

const StyledTextSmall = styled(TextSmall)`
  display:inline-block;
`;

const StyledBackIcon = styled.img`
  width: 18px;
  margin: 0 8px 0 0;
`;

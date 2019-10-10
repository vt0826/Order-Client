import React from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {navigate} from '@reach/router';
import styled from 'styled-components';

// Redux
import {setAccountOrders} from '../actionCreaters/orderAction';

// React Components
import {CampaignRemainTime} from '../components/CampaignRemainTime';

// Asset
import NextIcon from '../assets/next@2x.png';

// Style
import {
  DisplayXSmall,
  DisplaySmall,
  TextLarge,
  TextXSmall,
} from '../components/Typography';

const ACCOUNT_ORDERS = gql`
  query accountOrders {
    accountOrders {
      id
      subTotal
      orderItems {
        item {
          name
          pictures {
            url
          }
        }
        variants {
          option
        }
        quantity
      }
      campaign {
        fulfillReq
        name
        expiration
        pickupTime
        pickupAddress
      }
    }
  }
`;

const AccountOrderList = props => {
  if (!props.accountOrders || !props.accountOrders.length)
    return <div> NO ORDERS YET </div>;
  return props.accountOrders.map(order => (
    <div className="col-md-6" onClick={() => {
      props.redirectToOrderDetailPage(order.id);
    }}>
      <StyledOrder>
        <div className="row align-items-center">
          <div className="col-10">
            <StyledDisplayXSmall>ORDER {order.id}</StyledDisplayXSmall>
            <StyledTextLarge> {order.campaign.name}</StyledTextLarge>
            <div class="row nested">
              <div class="col-12">
                <TextXSmall>
                  {CampaignRemainTime(order.campaign.expiration)}
                </TextXSmall>
              </div>
              {/* No min order now */}
              {/*
              <div class="col-6">
                <StyledTextXSmall>
                  {order.campaign.fulfillReq} Min Order
                </StyledTextXSmall>
              </div>
              */}
            </div>
          </div>

          <div className="col-2">
            <StyledNextIcon src={NextIcon}/>
          </div>
        </div>
      </StyledOrder>
    </div>
  ));
};

class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  redirectToOrderDetailPage(orderId) {
    navigate('/orders/' + orderId);
  }
  renderAccountOrders() {
    return (
      <Query
        query={ACCOUNT_ORDERS}
        fetchPolicy="cache-and-network"
        onCompleted={data => this.props.setAccountOrders(data.accountOrders)}>
        {({loading, error, data}) => {
          if (loading) return <div>loading</div>;
          if (error) return <div>error</div>;
          return (
            <AccountOrderList
              accountOrders={this.props.accountOrders}
              campaignOrders={this.props.campaignOrders}
              redirectToOrderDetailPage={this.redirectToOrderDetailPage}
            />
          );
        }}
      </Query>
    );
  }

  render() {
    return (
      <StyledMainContainer className="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2">
            <StyledDisplaySmall>My Orders</StyledDisplaySmall>

            <StyledOrdersContainer>
              <Query
                query={ACCOUNT_ORDERS}
                onCompleted={data => this.props.setAccountOrders(data.accountOrders)}>
                {({loading, error, data}) => {
                  if (loading) return <div>loading</div>;
                  if (error) return <div>error</div>;
                  return (
                    <div class="row">
                      <AccountOrderList
                        accountOrders={this.props.accountOrders}
                        campaignOrders={this.props.campaignOrders}
                        redirectToOrderDetailPage={this.redirectToOrderDetailPage}
                      />
                    </div>
                  );
                }}
              </Query>
            </StyledOrdersContainer>
          </div>
        </div>
      </StyledMainContainer>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  accountOrders,
  campaignOrders,
}) => {
  return {
    sessionToken,
    account,
    accountOrders,
    campaignOrders,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setAccountItems action to update accountItems reducer
  setAccountOrders(orders) {
    dispatch(setAccountOrders(orders));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderList);

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

const StyledOrdersContainer = styled.div`
  padding: 40px 0 0 0;
  border-top: 1px solid #000;
`;

const StyledOrder = styled.div`
  padding: 0 0 20px;
  border-bottom: 1px solid #D8D8D8;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  padding: 0 0 12px 0;
`;

const StyledTextLarge = styled(TextLarge)`
  text-transform: capitalize;
  margin: 0 0 8px 0;
`;

const StyledNextIcon = styled.img`
  width: 100%;
`;

import React from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Mutation} from 'react-apollo';
import {Link, navigate} from '@reach/router';
import styled from 'styled-components';

// Redux
import {setOrder, updateOrder} from '../actionCreaters/orderAction';

// Helper Function
import {currencyFormat} from '../helper';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';

// Style
import {
  DisplaySmall,
  TextMedium,
  TextXLarge,
  TextSmall,
} from '../components/Typography';

const ORDER = gql`
  query order($orderId: ID!) {
    order(orderId: $orderId) {
      id
      complete
      subTotal
      payment
      note
      orderItems {
        item {
          name
          price
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
        id
        pickupTime
        pickupAddress
      }
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateOrder($orderId: ID!, $complete: Boolean!) {
    updateOrder(orderId: $orderId, input: {complete: $complete}) {
      status
      message
    }
  }
`;

const OrderDetail = props => {
  if (!props.order) return null;
  return (
    <div className="row">
      <div className="col-12">
        <StyledOrderNumberTextXLarge>
          ORDER {props.order.id}
        </StyledOrderNumberTextXLarge>
        <StyledTimeTextSmall>
          {props.order.campaign.pickupTime}
        </StyledTimeTextSmall>
        <StyledAddressTextSmall>
          {props.order.campaign.pickupAddress}
        </StyledAddressTextSmall>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-md-6">
            {props.order.orderItems.map(item => (
              <StyledOrderRow className="row nested">
                <div className="col-3">
                  <StyledImage
                    key={props.order.id}
                    src={ProductPlaceholder}
                    alt="item"
                  />
                </div>
                <div className="col-9">
                  <StyledItemTextXLarge> {item.item.name}</StyledItemTextXLarge>

                  <StyledItemTextSmall>
                    {item.variants.option}
                  </StyledItemTextSmall>

                  <StyledListItemRow>
                    <StyledItemQuantityTextMedium>
                      Quantity {item.quantity}
                    </StyledItemQuantityTextMedium>

                    <StyledItemPriceTextMedium>
                      {currencyFormat(item.item.price)}
                    </StyledItemPriceTextMedium>
                  </StyledListItemRow>
                </div>
              </StyledOrderRow>
            ))}
            <StyledOrderRow>
              <StyledOrderNumberTextXLarge>Summary</StyledOrderNumberTextXLarge>
              <StyledListItemRow>
                <StyledItemQuantityTextMedium>
                  Total
                </StyledItemQuantityTextMedium>

                <StyledItemPriceTextMedium>
                  {currencyFormat(props.order.subTotal)}
                </StyledItemPriceTextMedium>
              </StyledListItemRow>
            </StyledOrderRow>
          </div>
          <div className="col-md-6">
            <StyledOrderRow>
              <StyledOrderNumberTextXLarge>Payment</StyledOrderNumberTextXLarge>
              <StyledListItemRow>
                <StyledItemQuantityTextMedium>
                  {props.order.payment}
                </StyledItemQuantityTextMedium>
              </StyledListItemRow>
            </StyledOrderRow>

            <StyledOrderRow>
              <StyledOrderNumberTextXLarge>Note</StyledOrderNumberTextXLarge>
              <StyledInput
                value={props.order.note}
                onChange={e => props.handleNoteChange('note', e)}
                placeholder="Leave a speical note here for your host "
              />
            </StyledOrderRow>
          </div>
        </div>
      </div>
    </div>
  );
};

class ManageCampaignOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {complete: this.props.order.complete};
  }

  redirectToCampaignOrderLiistPage() {
    const campaignId = this.props.orders.campaign.id;
    console.log(campaignId);
    navigate('/manage/' + campaignId + '/orders');
  }

  renderOrderStatusUpdate() {
    const orderId = this.props.orderId;
    const complete = !this.props.order.complete;
    return (
      <div className="row">
        <div className="col-12">
          <Mutation
            mutation={UPDATE_STATUS}
            variables={{
              orderId,
              complete,
            }}
            onCompleted={data => {
              if (data) {
                this.props.updateOrderStatus(
                  'complete',
                  !this.props.order.complete,
                );
              }
            }}
            refetchQueries={() => [
              {
                query: ORDER,
                variables: {orderId},
              },
            ]}>
            {(updateOrder, {data, loading, error}) => (
              <button type="button" onClick={updateOrder}>
                {this.props.order.complete ? 'Completed' : 'Mark Complete'}
              </button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }

  render() {
    const orderId = this.props.orderId;
    return (
      <React.Fragment>
        <Query
          query={ORDER}
          variables={{orderId}}
          fetchPolicy="no-cache"
          onCompleted={data => this.props.setOrder(data.order)}>
          {({loading, error, data}) => {
            if (loading) return <div>loading</div>;
            if (error) return <div>{error}</div>;
            return (
              <React.Fragment>
                <div className="row">
                  <div className="col-md-6">
                    <StyledTitleDisplaySmall>
                      Order Info
                    </StyledTitleDisplaySmall>
                  </div>
                  <div className="col-md-6">
                    <StyledTitleTextSmall>
                      <Link
                        to={`/manage/${this.props.order.campaign.id}/orders`}>
                        {'<'} Back to list
                      </Link>
                    </StyledTitleTextSmall>
                  </div>
                </div>

                <OrderDetail
                  order={this.props.order}
                  handleNoteChange={this.handleNoteChange}
                />

                {this.renderOrderStatusUpdate()}
              </React.Fragment>
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
  accountOrders,
  campaignOrders,
  order,
}) => {
  return {
    sessionToken,
    account,
    accountOrders,
    campaignOrders,
    order,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setAccountItems action to update accountItems reducer
  setOrder(order) {
    dispatch(setOrder(order));
  },
  updateOrderStatus(field, complete) {
    const order = {field: field, value: complete};
    dispatch(updateOrder(order));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageCampaignOrder);

/*
 ** Styled Components
 */
const StyledImage = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const StyledTitleDisplaySmall = styled(DisplaySmall)`
  flex: 2;
`;

const StyledTitleTextSmall = styled(TextSmall)`
  text-align: right;
  flex: 2;
  a {
    color: #000;
    text-decoration: none;
    text-transform: capitalize;
  }
`;

const StyledOrderRow = styled.div`
  border-bottom: 1px solid #f7f7f7;
`;

const StyledOrderNumberTextXLarge = styled(TextXLarge)`
  margin-bottom: 20px;
  padding: 0;
`;
const StyledTimeTextSmall = styled(TextSmall)`
  padding: 0;
`;
const StyledAddressTextSmall = styled(TextSmall)`
  padding: 0;

  margin-bottom: 20px;
`;

const StyledItemTextXLarge = styled(TextXLarge)`
  margin-top: 20px;
  text-transform: capitalize;
  padding: 0;
`;

const StyledItemTextSmall = styled(TextSmall)`
  margin-bottom: 20px;
  text-transform: capitalize;
  padding: 0;
`;
const StyledListItemRow = styled.div`
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  direction: row;
  align-items: baseline;
`;
const StyledItemQuantityTextMedium = styled(TextMedium)`
  margin-bottom: 20px;
  text-transform: capitalize;
  flex:2
  padding: 0;
`;
const StyledItemPriceTextMedium = styled(TextMedium)`
  text-align: right;
  text-transform: capitalize;

  flex:2
  padding: 0;
`;

const StyledInput = styled.input`
  outline: none;
  display: inline-block;
  height: 80px
  width: 100%;
  background: transparent;
  font-size: 13.33px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.8px;
  padding: 8px 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #e7e7e7;
`;

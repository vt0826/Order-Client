import React from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Mutation} from 'react-apollo';
import {Link, navigate} from '@reach/router';
import styled from 'styled-components';

// Redux
import {setOrder, updateOrder} from '../actionCreaters/orderAction';

// Helper
import {currencyFormat} from '../helper';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';
import BackIcon from '../assets/back@2x.png';

// Style
import {
  DisplaySmall,
  TextMedium,
  TextXLarge,
  TextSmall,
} from '../components/Typography';

// GQL
const ORDER = gql`
  query order($orderId: ID!) {
    order(orderId: $orderId) {
      id
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
        pickupTime
        pickupAddress
      }
    }
  }
`;

const UPDATE_NOTE = gql`
  mutation updateOrder($orderId: ID!, $note: String!) {
    updateOrder(orderId: $orderId, input: {note: $note}) {
      status
      message
    }
  }
`;

const OrderDetail = props => {
  const note = props.order.note;
  const orderId = props.orderId;

  if (!props.order) return null;

  return (
    <React.Fragment>
      <div className="col-12">
        <StyledTextXLarge>
          ORDER {props.order.id}
        </StyledTextXLarge>
        <TextSmall>
          {props.order.campaign.pickupTime}
        </TextSmall>
        <TextSmall>
          {props.order.campaign.pickupAddress}
        </TextSmall>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-md-6">
            {props.order.orderItems.map(item => (
              <StyledProduct>
                <div className="row nested">
                  <div className="col-3">
                    <StyledImage
                      key={props.order.id}
                      src={ProductPlaceholder}
                      alt="item"
                    />
                  </div>
                  <div className="col-9">
                    <TextXLarge>{item.item.name}</TextXLarge>

                    <TextSmall>{item.variants.option}</TextSmall>

                    <div className="row nested">
                      <div className="col-6">
                        <TextMedium>
                          Quantity {item.quantity}
                        </TextMedium>
                      </div>
                      <div className="col-6">
                        <StyledTextMedium>
                          {currencyFormat(item.item.price)}
                        </StyledTextMedium>
                      </div>
                    </div>
                  </div>
                </div>
              </StyledProduct>
            ))}

            <div className="row nested">
              <div className="col-12">
                <StyledSectionTextXLarge>Summary</StyledSectionTextXLarge>
              </div>
              <div className="col-6">
                <TextMedium>Total</TextMedium>
              </div>
              <div className="col-6">
                <StyledTextMedium>
                  {currencyFormat(props.order.subTotal)}
                </StyledTextMedium>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row nested">
              <div className="col-12">
                <StyledSectionTextXLarge>Payment</StyledSectionTextXLarge>
              </div>
              <div className="col-12">
                <div className="row nested">
                  <div className="col-12">
                    <TextMedium>
                      {props.order.payment}
                    </TextMedium>
                  </div>
                </div>
              </div>
            </div>

            <div className="row nested">
              <div className="col-12">
                <StyledSectionTextXLarge>Note</StyledSectionTextXLarge>
                <StyledInput
                  value={props.order.note}
                  onChange={e => props.handleNoteChange('note', e)}
                  placeholder="Leave a special note for your host"
                />
                <Mutation
                  mutation={UPDATE_NOTE}
                  variables={{
                    orderId,
                    note,
                  }}
                  onCompleted={data => {
                    if (data) {
                      console.log(data);
                    }
                  }}>
                  {(updateOrder, {data, loading, error}) => (
                    <button type="button" onClick={updateOrder}>
                      UpdateNote
                    </button>
                  )}
                </Mutation>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleNoteChange = (field, event) => {
    const order = {field: field, value: event.target.value};
    this.props.updateOrder(order);
  };

  redirectToOrderListPage() {
    navigate('/orders/');
  }

  renderOrder() {
    const orderId = this.props.orderId;

    return (
      <div className="row">
        <Query
          query={ORDER}
          variables={{orderId}}
          fetchPolicy="no-cache"
          onCompleted={data => this.props.setOrder(data.order)}>
          {({loading, error, data}) => {
            if (loading) return <div>loading</div>;
            if (error) return <div>{error}</div>;
            return (
              <OrderDetail
                order={this.props.order}
                handleNoteChange={this.handleNoteChange}
              />
            );
          }}
        </Query>
      </div>
    );
  }

  render() {
    return (
      <StyledMainContainer className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="row">
              <div className="col-6">
                <StyledDisplaySmall> My Orders</StyledDisplaySmall>
              </div>
              <div className="col-6">
                <StyledBackLink>
                  <Link to={'/orders'}>
                    <StyledBackIcon src={BackIcon}/>
                    <StyledTextSmall>Back to list</StyledTextSmall>
                  </Link>
                </StyledBackLink>
              </div>
            </div>
            <StyledOrderContainer>
              {this.renderOrder()}
            </StyledOrderContainer>
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
  updateOrder(order) {
    dispatch(updateOrder(order));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);

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

const StyledBackLink = styled.div`
  text-align: right;
`;

const StyledTextSmall = styled(TextSmall)`
  display:inline-block;
`;

const StyledBackIcon = styled.img`
  width: 18px;
  margin: 0 8px 0 0;
`;

const StyledProduct = styled.div`
  margin: 20px 0;
`;

const StyledOrderContainer = styled.div`
  padding: 40px 0 0 0;
  border-top: 1px solid #000;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledSectionTextXLarge = styled(TextXLarge)`
  margin: 20px 0 8px;
  padding: 0;
`;


const StyledTextXLarge = styled(TextXLarge)`
  margin: 0 0 20px 0;
`;

const StyledTextMedium = styled(TextMedium)`
  text-align: right;
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

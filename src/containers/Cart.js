import React from 'react';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { navigate } from '@reach/router';
import styled from 'styled-components';

// Components
import { CartCampaignList } from '../components/CartCampaignList';
import { CartListItems } from '../components/CartListItems';

// Redux
import {
  addToCartListItems,
  updatePaymentStatusInCart,
  updateNoteInCart,
  removeCampaignFromCart,
  removeItemFromCart,
} from '../actionCreaters/cartAction';

// Asset
import CloseIcon from '../assets/product-list/delete.png';
import CartInactiveIcon from '../assets/header/cart/inactive@2x.png';
import CartActiveIcon from '../assets/header/cart/active@2x.png';

// Style
import {
  DisplaySmall,
  TextXLarge,
  TextLarge,
  TextSmall,
} from '../components/Typography';

//graph QL schema
const NEW_ORDER = gql`
  mutation NewOrder(
    $subTotal: Float!
    $payment: String!
    $note: String
    $campaign: ID!
    $orderItems: [OrderItemInput]!
  ) {
    newOrder(
      input: {
        subTotal: $subTotal
        campaign: $campaign
        orderItems: $orderItems
        payment: $payment
        note: $note
      }
    ) {
      status
      message
      id
    }
  }
`;

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 'campaign',
      campaignId: '',
      isActive: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isActive: true }), 0);
  }

  //update the payment method in cart
  updatePaymentStatusInCart = (campaignId, event) => {
    const payment = event.target.value;
    this.props.updatePaymentStatusInCart(campaignId, payment);
  };

  //update the note method in cart
  updateNoteInCart = (campaignId, event) => {
    const note = event.target.value;
    this.props.updateNoteInCart(campaignId, note);
  };

  // increase cart item quantity when user click + button and call the addToCartListItems to disaptch action to update the redux store
  _quantityIncrement = (campaignId, variantId) => {
    const listItem = {
      [variantId]: this.props.cart[campaignId].listItems[variantId],
    };
    listItem[variantId].quantity = listItem[variantId].quantity + 1;

    listItem[variantId].amount =
      listItem[variantId].amount + Number(listItem[variantId].price);
    this.props.addToCartListItems(listItem, campaignId, variantId);
  };

  // decrease cart item quantity when user click - button and call the addToCartListItems to disaptch action to update the redux store. if the item quantity is 1, do nothing
  _quantityDecrease = (campaignId, variantId) => {
    const listItem = {
      [variantId]: this.props.cart[campaignId].listItems[variantId],
    };
    if (listItem[variantId].quantity > 1) {
      listItem[variantId].quantity = listItem[variantId].quantity - 1;
      listItem[variantId].amount =
        listItem[variantId].amount - Number(listItem[variantId].price);
      this.props.addToCartListItems(listItem, campaignId, variantId);
    }
  };

  // set currentPage state to 'campaign' so that the cart will show campaign lists
  _listCampaign = () => {
    this.setState({
      currentPage: 'campaign',
    });
  };

  // set currentPage state to 'listItems' so that the cart will show order items with given campaignId
  _listItems = campaignId => {
    this.setState({
      currentPage: 'listItems',
      campaignId: campaignId,
    });
  };

  //remove item from cart but if there only one in the list, remove whole campaign from the cart
  _removeFromCart = (campaignId, variantId) => {
    let listItemLength = Object.keys(this.props.cart[campaignId].listItems)
      .length;
    if (listItemLength === 1) {
      this.props.removeCampaignFromCart(campaignId);
      this._listCampaign();
    } else {
      this.props.removeItemFromCart(campaignId, variantId);
    }
  };

  // map though store's cart props and then return the campaign list in cart
  renderCartCampaignLists(cart) {
    return Object.keys(cart).map(campaign => (
      <CartCampaignList
        cart={cart}
        campaign={campaign}
        _listItems={this._listItems}
      />
    ));
  }

  // map though store's cart props and then return the campaign order listitems  in cart
  renderCartItems(cart) {
    const campaign = this.state.campaignId;
    const payment = cart[campaign].payment;
    const note = cart[campaign].note;
    const subTotal = Object.keys(cart[campaign].listItems).reduce(
      (accumulator, currentValue) =>
        accumulator + cart[campaign].listItems[currentValue].amount,
      // cart[campaign].listItems[currentValue].quantity,
      0
    );
    //create new orderItems and item object for mutation variables
    var orderItems = [];
    var item = {};

    Object.keys(cart[campaign].listItems).map(listItem => {
      return (
        (item = {
          item: cart[campaign].listItems[listItem].itemId,
          variants: cart[campaign].listItems[listItem].variantId,
          quantity: cart[campaign].listItems[listItem].quantity,
          amount: cart[campaign].listItems[listItem].amount,
          option: cart[campaign].listItems[listItem].option,
        }),
        orderItems.push(item)
      );
    });

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <TextXLarge>{cart[campaign].campaignName}</TextXLarge>
            <TextSmall>pick up time</TextSmall>
            <TextSmall>pick up location</TextSmall>
          </div>
        </div>

        {Object.keys(cart[campaign].listItems).map(item => (
          <CartListItems
            cart={cart}
            item={item}
            campaign={campaign}
            _removeFromCart={this._removeFromCart}
            _quantityIncrement={this._quantityIncrement}
            _quantityDecrease={this._quantityDecrease}
          />
        ))}

        {/* Summary Section */}
        <div className="row">
          <div className="col-12">
            <h5>Summary</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6">Total</div>

          <div className="col-6">$ {subTotal}</div>
        </div>
        {/* Summary Section */}
        <div className="row">
          <div className="col-12">
            <h5>Payment</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-2">
            <input
              onClick={event => this.updatePaymentStatusInCart(campaign, event)}
              type="radio"
              name="payment"
              value="cash"
            />
          </div>
          <div className="col-10">In Cash</div>
        </div>
        <div className="row">
          <div className="col-2">
            <input
              onClick={event => this.updatePaymentStatusInCart(campaign, event)}
              type="radio"
              name="payment"
              value="venmo"
            />
          </div>
          <div className="col-10">Venmo</div>
        </div>
        <div className="row">
          <div className="col-2">
            <input
              onClick={event => this.updatePaymentStatusInCart(campaign, event)}
              type="radio"
              name="payment"
              value="quickPay"
            />
          </div>
          <div className="col-10">Quick Pay</div>
        </div>

        <div>
          <p>Note</p>
          <input
            value={note}
            onChange={event => this.updateNoteInCart(campaign, event)}
            placeholder="Leave a speical note here for your host "
          />
        </div>

        {/* remove campaign from cart when the order has sumbitted and call _listCampaign function to redreict back to cart campaign page */}
        <Mutation
          mutation={NEW_ORDER}
          variables={{ subTotal, campaign, payment, orderItems, note }}
          onCompleted={data => {
            if (data.newOrder.status) {
              this.props.removeCampaignFromCart(campaign);
              this._listCampaign();
              navigate('/orders/' + data.newOrder.id);
            }
          }}
        >
          {(newOrder, { data, loading, error }) => (
            <button onClick={newOrder}>Confirm Order</button>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
  //render campaign list / campaign order items or no item base on the currentPage state and cart length
  renderCart(cart) {
    if (this.state.currentPage === 'campaign') {
      if (!Object.keys(cart).length)
        return <TextLarge>No item in Cart</TextLarge>;
      return this.renderCartCampaignLists(cart);
    } else if (this.state.currentPage === 'listItems') {
      return this.renderCartItems(cart);
    }
  }

  render() {
    const cart = this.props.cart;
    return (
      <StyledCart className={this.state.isActive ? 'active' : ''}>
        <StyledCartContainer>
          <StyledCartHeader>
            <StyledIconDiv className="row">
              <StyledCloseIconDiv className="col-1">
                <StyledCloseIcon
                  src={CloseIcon}
                  onClick={this.props.toggleModal}
                  alt="CloseIcon"
                />
              </StyledCloseIconDiv>
              <StyledCartIconDiv className="col-1">
                <StyledCartActiveIcon
                  src={CartInactiveIcon}
                  onClick={this.toggleModal}
                  alt="CartActiveIcon"
                />
              </StyledCartIconDiv>
              <div className="col-10">
                <StyledTextLarge>Order By Thyhive</StyledTextLarge>
              </div>
            </StyledIconDiv>
            <StyledMyCartDiv className="row">
              <div className="col-6">
                <DisplaySmall>My Cart</DisplaySmall>
              </div>

              <div className="col-6">
                {this.state.currentPage === 'listItems' && (
                  <button onClick={this._listCampaign}> {'<<'} Back </button>
                )}
              </div>
            </StyledMyCartDiv>
          </StyledCartHeader>
          {this.renderCart(cart)}
        </StyledCartContainer>
      </StyledCart>
    );
  }
}
const mapStateToProps = ({ sessionToken, cart, account, privilage }) => {
  return {
    sessionToken,
    cart,
    account,
    privilage,
  };
};
const mapDispatchToProps = dispatch => ({
  removeItemFromCart(campaignId, variantId) {
    let payload = { campaignId, variantId };
    dispatch(removeItemFromCart(payload));
  },

  removeCampaignFromCart(campaignId) {
    dispatch(removeCampaignFromCart(campaignId));
  },

  addToCartListItems(item, campaignId, variantId) {
    const payload = {
      item,
      campaignId,
      variantId,
    };
    dispatch(addToCartListItems(payload));
  },
  updatePaymentStatusInCart(campaignId, payment) {
    const payload = {
      campaignId,
      payment,
    };
    dispatch(updatePaymentStatusInCart(payload));
  },
  updateNoteInCart(campaignId, note) {
    const payload = {
      campaignId,
      note,
    };
    dispatch(updateNoteInCart(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

// Styled Components
const StyledCart = styled.section`
  position: fixed;
  top: 0;
  left: -600px;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 1);
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;

  @media (min-width: 600px) {
    width: 375px;
  }

  &.active {
    left: 0;
  }
`;
const StyledCartHeader = styled.div`
  border-bottom: 1px solid #000;
`;
const StyledCartContainer = styled.div`
  width: 100%;
  padding-right: 16px;
  padding-left: 16px;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;
const StyledIconDiv = styled.div`
  margin-top: 12px;
`;
const StyledCloseIconDiv = styled.div`
  &&& {
    padding-right: 8px;
  }
`;
const StyledCartIconDiv = styled.div`
  &&& {
    padding-left: 8px;
  }
`;
const StyledMyCartDiv = styled.div`
  margin-top: 36px;
`;
const StyledCartActiveIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const StyledCartInactiveIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const StyledCloseIcon = styled.img`
  width: 18px;
  height: 18px;
`;
const StyledTextLarge = styled(TextLarge)`
  text-align: right;
`;

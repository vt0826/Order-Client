import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {navigate, Link} from '@reach/router';

// Redux
import {setCampaign} from '../actionCreaters/campaignAction';
import {addToCart, addToCartListItems} from '../actionCreaters/cartAction';
import {setItem} from '../actionCreaters/itemAction';

// Components
import {ListItemInfo} from '../components/ListItemInfo';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';
import BackIcon from '../assets/back@2x.png';

// Style
import {
  TextSmall,
} from '../components/Typography';

//graph QL schema
const ITEM = gql`
  query Item($itemId: ID!) {
    item(itemId: $itemId) {
      id
      price
      name
      variants {
        id
        option
      }
      pictures {
        id
        url
      }
    }
  }
`;

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
      }
      host {
        email
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

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaignId: this.props.campaignId,
      quantity: 1,
      addToCart: false,
      //show: true,
    };
  }
  /*
  ToggleClick = () => {
    this.setState({
      show: !this.state.show,
    });
  };
*/

  //add item to cart. update the quanitity if the item already exist
  addToCart = e => {
    e.preventDefault();
    this.setState({addToCart: true});

    const variant = JSON.parse(e.target.variant.value);
    const campaignId = e.target.campaignId.value;
    const variantId = variant.id;
    //create item object for the cart items
    let item = {
      campaignId: e.target.campaignId.value,
      campaignName: e.target.campaignName.value,
      listItems: {
        [variantId]: {
          itemId: e.target.itemId.value,
          itemName: e.target.itemName.value,
          itemPicture: e.target.itemPicture.value,
          price: e.target.price.value,
          variantId: variant.id,
          option: variant.option,
          quantity: Number(e.target.quantity.value),
          amount:
            Number(e.target.quantity.value) * Number(e.target.price.value),
        },
      },
    };

    let campaignAlreadyInCart = false;
    let listItemAlreadyInCart = false;

    // check see item already in cart
    if (item.campaignId in this.props.cart) {
      if (variantId in this.props.cart[campaignId].listItems) {
        campaignAlreadyInCart = true;
        listItemAlreadyInCart = true;
        const quantity = (item.listItems[variantId].quantity += this.props.cart[
          campaignId
        ].listItems[variantId].quantity);
        item.listItems[variantId].quantity = quantity;

        this.props.addToCartListItems(item.listItems, campaignId, variantId);
      }

      if (!listItemAlreadyInCart) {
        campaignAlreadyInCart = true;

        this.props.addToCartListItems(item.listItems, campaignId, variantId);
      }
    }
    //add item to cart since cart does not have such item
    if (!campaignAlreadyInCart) {
      this.props.addToCart(item);
    }
  };

  //increase the quantity when + button has been clicked
  _incrementItem = () => {
    this.setState(prevState => {
      if (prevState.quantity < 9) {
        return {
          quantity: prevState.quantity + 1,
        };
      } else {
        return null;
      }
    });
  };

  //decrease the quantity when + button has been clicked
  _decreaseItem = () => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1,
        };
      } else {
        return null;
      }
    });
  };

  _handleChange = event => {
    this.setState({quantity: event.target.value});
  };

  // redirct to Item page
  redirectToItemPage(campaignId, itemId) {
    navigate('/campaign/' + campaignId + '/' + itemId);
  }

  //render all campaign items
  renderListItems(items) {
    if (!items) return null;
    return items.map(item => (
      <ListItemInfo
        key={item.id}
        item={item}
        itemsNumber={items.length}
        campaignId={this.props.campaignId}
        redirectToItemPage={this.redirectToItemPage}
      />
    ));
  }

  //render each item pictures, show default pic if there's no item picutre
  renderItemPictures(pictures) {
    if (!pictures.length) {
      return (
        <StyledImage key={pictures.id} src={ProductPlaceholder} alt="item" />
      );
    }
    return pictures.map(picture => (
      <StyledImage key={picture.id} src={ProductPlaceholder} alt="item" />
    ));
  }

  renderFilteredVariant(variant) {
    if (variant.option === 'default') return null;
    return (
      <React.Fragment>
        <table key={variant.id}>
          <tbody>
            <tr>
              <td>
                <input type="hidden" name="option" value={variant.option} />
                <input
                  type="radio"
                  name="variant"
                  value={JSON.stringify(variant)}
                />
                {variant.option}
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  renderVariants(item) {
    if (item.variants.length === 1) {
      return (
        <div>
          {item.variants.map(variant => (
            <table key={variant.id}>
              <tbody>
                <tr>
                  <td>
                    <input type="hidden" name="option" value={variant.option} />
                    <input
                      type="hidden"
                      name="variant"
                      value={JSON.stringify(variant)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      );
    }
    return (
      <div>
        {item.variants.map(variant => this.renderFilteredVariant(variant))}
      </div>
    );
  }
  //reder item info and let user add selcted item to the cart
  renderItemInfo(item, campaign) {
    //const variantJSON = '';
    if (!item) return null;
    return (
      <form onSubmit={this.addToCart}>
        <div className="grid-x grid-margin-x">
          <div className="cell large-6">
            <input type="hidden" name="campaignId" value={campaign.id} />
            <input type="hidden" name="campaignName" value={campaign.name} />
            <input type="hidden" name="itemName" value={item.name} />
            <input
              type="hidden"
              name="itemPicture"
              // value={item.pictures[0].url}
            />
            <h4>{item.name || 'No Name'}</h4>

            <input type="hidden" name="price" value={item.price} />
            <h6>$ {item.price || '0.00'}</h6>

            <input type="hidden" name="itemId" value={item.id} />

            {this.renderVariants(item)}
          </div>
          <div className="cell large-12">&nbsp;</div>

          <div className="cell large-6">
            <button type="button" onClick={this._decreaseItem}>
              -
            </button>
            <input
              className="inputne"
              name="quantity"
              value={this.state.quantity}
              onChange={this._handleChange}
              readOnly
            />
            <button type="button" onClick={this._incrementItem}>
              +
            </button>
          </div>
          <div className="cell large-6">
            <button type="submit">
              {this.state.addToCart ? 'Added' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    const itemId = this.props.itemId;
    const campaignId = this.props.campaignId;
    if (!campaignId || !itemId) return null;
    return (
      <StyledMainContainer className="container">
        <Query
          query={ITEM}
          variables={{itemId}}
          fetchPolicy="no-cache"
          onCompleted={data => this.props.setItem(data.item)}>
          {({loading: loadingItem, data: {item}}) => (
            <Query
              query={CAMPAIGN}
              variables={{campaignId}}
              fetchPolicy="cache-and-network"
              onCompleted={data => this.props.setCampaign(data.campaign)}>
              {({loading: {loadingCampaign}, data: {campaign}}) => {
                if (loadingCampaign || loadingItem) return <div>loading</div>;
                return (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-lg-8 offset-lg-2">
                        <StyledBackLink>
                          <Link to={`/campaign/${campaignId}`}>
                            <StyledBackIcon src={BackIcon}/>
                            <StyledTextSmall>Back to Campaign</StyledTextSmall>
                          </Link>
                        </StyledBackLink>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 offset-lg-2">
                        {this.renderItemPictures(this.props.item.pictures)}
                      </div>
                      <div className="col-lg-4">
                        {this.renderItemInfo(
                          this.props.item,
                          this.props.campaign,
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              }}
            </Query>
          )}
        </Query>
      </StyledMainContainer>
    );
  }
}

const mapStateToProps = ({
  session,
  account,
  privilage,
  cart,
  item,
  campaign,
}) => {
  return {
    session,
    cart,
    account,
    campaign,
    item,
    privilage,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  //dispatch set campaign action to set campaign details in redux store
  setCampaign(campaign) {
    dispatch(setCampaign(campaign));
  },
  // dispatch add to cart action to add items to the redux store
  addToCart(item) {
    dispatch(addToCart(item));
  },
  // dispatch add to cart list items action to add items to the redux store
  addToCartListItems(item, campaignId, variantId) {
    const payload = {
      item,
      campaignId,
      variantId,
    };
    dispatch(addToCartListItems(payload));
  },
  //dispatch setItem action to set item details in redux store
  setItem(item) {
    dispatch(setItem(item));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);

/******************************************************************
** Styled Components
*/
const StyledMainContainer = styled.div`
  margin-top: 76px;
  margin-bottom: 76px;
`;

const StyledBackLink = styled.div`
`;

const StyledTextSmall = styled(TextSmall)`
  display:inline-block;
`;

const StyledBackIcon = styled.img`
  width: 18px;
  margin: 0 8px 0 0;
`;

const StyledImage = styled.img`
  width: 100%;
  margin-bottom: 21px;
`;

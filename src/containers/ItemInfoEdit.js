import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '@reach/router';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

import {
  setItem,
  itemRefetchRequire,
  itemRefetchFinished,
  accountItemsRefetchRequire,
  updateItemField,
} from '../actionCreaters/itemAction';

import styled from 'styled-components';
import {DisplayXSmall, TextXLarge} from '../components/Typography';

const UPDATE_ITEM = gql`
  mutation updateItem(
    $itemId: ID!
    $name: String!
    $price: Float!
    $pictures: [PictureUrlInput]
    $variants: [VariantInput]
  ) {
    updateItem(
      itemId: $itemId
      input: {
        name: $name
        price: $price
        pictures: $pictures
        variants: $variants
      }
    ) {
      status
      message
    }
  }
`;

const ITEM = gql`
  query item($itemId: ID!) {
    item(itemId: $itemId) {
      id
      name
      price
      variants {
        id
        option
      }
      pictures {
        url
      }
    }
  }
`;

class ItemInfoEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      // option: '',
    };
  }

  redirectToCampaignProductPage(campaignId) {
    if (campaignId) {
      navigate('/manage/' + campaignId + '/product');
    } else {
      navigate('/host/product');
    }
  }

  //update forms's corresponding state
  handleInput = (field, event) => {
    if (field === 'option') {
      this.setState({option: event.target.value});
    }
    const item = {field: field, value: event.target.value};
    this.props.updateItemField(item);
  };

  render() {
    const itemId = this.props.item.id;
    const name = this.props.item.name;
    const price = parseFloat(this.props.item.price);
    const campaignId = this.props.campaignId;
    const picturesFromProps = this.props.item.pictures;
    const pictures = picturesFromProps.map(function(item) {
      return {url: item.url};
    });
    const variantsFromProps = this.props.item.variants;
    const variants = variantsFromProps.map(function(item) {
      return {option: item.option};
    });

    return (
      <React.Fragment>
        <StyledDiv>
          <StyledDisplayXSmall className="inputLabel">
            TITLE
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            type="text"
            id="name"
            value={this.props.item.name}
            placeholder="NATURAL BATH SOAP"
            onChange={e => this.handleInput('name', e)}
          />
        </StyledDiv>

        <StyledDiv>
          <StyledDisplayXSmall className="inputLabel">
            PRICE
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            id="price"
            value={this.props.item.price}
            type="number"
            placeholder="$ 1.00"
            onChange={e => this.handleInput('price', e)}
          />
        </StyledDiv>

        <StyledDiv>
          <StyledDisplayXSmall className="inputLabel">TAG</StyledDisplayXSmall>
          <StyledInput as="input" id="tag" type="text" placeholder="Salt Bat" />
          <Mutation
            mutation={UPDATE_ITEM}
            variables={{
              itemId,
              name,
              price,
              pictures,
              variants,
            }}
            refetchQueries={() => [
              {
                query: ITEM,
                variables: {itemId},
              },
            ]}
            onCompleted={data => {
              if (data) {
                this.redirectToCampaignProductPage(campaignId);
              }
            }}>
            {(updateItem, {data, loading, error}) => (
              <button type="button" onClick={updateItem}>
                UPDATE PRODUCT
              </button>
            )}
          </Mutation>
        </StyledDiv>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  item,
  itemRefetchRequire,
  campaign,
}) => {
  return {
    sessionToken,
    item,
    itemRefetchRequire,
    account,
    campaign,
  };
};

const mapDispatchToProps = dispatch => ({
  //dispatch setCampaign action to set campaign reducer
  setItem(item) {
    //dispatch(setCampaign(campaign));
    dispatch(setItem(item));
    dispatch(itemRefetchFinished());
  },
  updateItem(item) {
    dispatch(itemRefetchRequire());
    dispatch(accountItemsRefetchRequire());
  },
  editVariant() {
    dispatch(itemRefetchRequire());
  },
  updateItemField(item) {
    dispatch(updateItemField(item));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemInfoEdit);

/*
 ** Styled Components
 */
const StyledDiv = styled.div`
  margin-bottom: 28px;
`;

const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0 20px 0 0;
  color: #111111;
`;

const StyledInput = styled(TextXLarge)`
  text-transform: Capitalize;
  display: inline-block;
  outline: none;
  width: 100%;
  background: transparent;
  height: 32px;
  color: #000;
  font-size: 13.33px;
  font-weight: 300;
  line-height: 20px;
  letter-spacing: 0.8px;
  padding: 8px 0;
  margin-bottom: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #cacaca;
`;

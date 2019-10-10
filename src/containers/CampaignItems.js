import React from 'react';
import {connect} from 'react-redux';
import {navigate} from '@reach/router';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {Mutation} from 'react-apollo';

// Redux
import {
  setCampaign,
  campaignsRefetchRequire,
} from '../actionCreaters/campaignAction';
import {refetchRequire} from '../actionCreaters/refetchAction';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';
import DeleteIcon from '../assets/product-list/delete@2x.png';
import EditIcon from '../assets/product-list/edit@2x.png';

// Style
import {DisplayXSmall, TextXLarge, TextMedium} from '../components/Typography';

// GraphQL
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
        displayName
      }
      host {
        email
      }
      listItems {
        id
        price
        name
        pictures {
          url
        }
      }
    }
  }
`;

const NEW_ITEM_ADD_TO_LIST_ITEMS = gql`
  mutation NewItemAddToListItems($campaignId: ID!) {
    newItemAddToListItems(campaignId: $campaignId) {
      id
      status
      message
    }
  }
`;

const REMOVE_LIST_ITEM = gql`
  mutation removeListItem($campaignId: ID!, $itemId: ID!) {
    removeListItem(
      campaignId: $campaignId
      input: {listItems: {itemId: $itemId}}
    ) {
      status
      message
    }
  }
`;

/**********************************************************/
class CampaignItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaign: this.props.campaign,
    };
  }

  // redirect to Item page from given campaign id and item id
  redirectToItemEditPage(itemId) {
    navigate('/item/' + itemId);
  }

  // Update forms's corresponding state
  handleInput = (field, event) => {
    let campaign = {...this.state.campaign};
    campaign[field] = event.target.value;
    this.setState({campaign});
  };

  redirectToHostProduct(campaignId) {
    campaignId = this.props.campaignId;
    navigate('/host/product/' + campaignId);
  }

  renderCampaignProducts() {
    if (!this.props.campaign || !this.props.campaign.listItems.length)
      return null;
    return this.props.campaign.listItems.map(item => (
      <StyledManageCampaignProduct className="col-md-6">
        <div class="row nested">
          <div className="col-3">
            <StyledImage src={ProductPlaceholder} alt="default" />
          </div>

          <div className="col-7">
            <TextXLarge> {item.name} </TextXLarge>
            <TextMedium> $ {item.price} </TextMedium>
          </div>
          <div className="col-2">
            <Mutation
              mutation={REMOVE_LIST_ITEM}
              variables={{campaignId: this.props.campaign.id, itemId: item.id}}
              refetchQueries={() => [
                {
                  query: CAMPAIGN,
                  variables: {campaignId: this.props.campaignId},
                },
              ]}
              onCompleted={data => {
                if (data) {
                  //const type = 'SET_CAMPAIGNS_REFETCH';
                }
              }}>
              {(removeListItem, {data, loading, error}) => {
                return (
                  <StyledDeleteIcon src={DeleteIcon} onClick={removeListItem} />
                );
              }}
            </Mutation>

            <StyledEditIcon
              src={EditIcon}
              onClick={() => this.redirectToItemEditPage(item.id)}
            />
          </div>
        </div>
      </StyledManageCampaignProduct>
    ));
  }

  renderCampaignEdit() {
    const id = this.props.campaignId;

    return (
      <React.Fragment>
        <StyledManageCampaignProducts className="row">
          {this.renderCampaignProducts()}
        </StyledManageCampaignProducts>
        <div className="row">
          <div className="col-md-6">
            <Mutation
              mutation={NEW_ITEM_ADD_TO_LIST_ITEMS}
              variables={{campaignId: id}}
              refetchQueries={() => [
                {
                  query: CAMPAIGN,
                  variables: {campaignId: this.props.campaignId},
                },
              ]}
              onCompleted={data => {
                if (data) {
                  this.redirectToItemEditPage(
                    this.props.campaignId,
                    data.newItemAddToListItems.id,
                  );
                }
              }}>
              {(newItemAddToListItems, {data, loading, error}) => {
                return (
                  <StyledButton onClick={newItemAddToListItems}>
                    {' '}
                    NEW PRODUCT
                  </StyledButton>
                );
              }}
            </Mutation>
          </div>
          <div className="col-md-6">
            <StyledButton onClick={() => this.redirectToHostProduct(id)}>
              ADD FROM PRODUCT List
            </StyledButton>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const campaignId = this.props.campaignId;
    return (
      <Query
        query={CAMPAIGN}
        variables={{campaignId}}
        //fetchPolicy="no-cache"
        onCompleted={data => this.props.setCampaign(data.campaign)}>
        {({loading, error, data}) => {
          if (loading) return <div>loading</div>;
          if (error) return <div>error</div>;
          return <React.Fragment> {this.renderCampaignEdit()} </React.Fragment>;
        }}
      </Query>
    );
  }
}

const mapStateToProps = ({sessionToken, account, campaign}) => {
  return {
    sessionToken,
    account,
    campaign,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setCampaign action to set campaign reducer
  setCampaign(campaign) {
    dispatch(setCampaign(campaign));
    dispatch(campaignsRefetchRequire());
  },

  refetchRequire() {
    const type = 'SET_CAMPAIGNS_REFETCH';
    dispatch(refetchRequire(type));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignItems);

/********************************************************************
 ** Styled components
 */
const StyledManageCampaignProducts = styled.div`
  margin: 40px 0 20px 0;
`;

const StyledManageCampaignProduct = styled.div`
  margin: 0 0 20px 0;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledTextMedium = styled(TextMedium)`
  padding: 0 0 0 8px;
  margin: 0;
  text-align: left;
`;

const StyledTextXLarge = styled(TextXLarge)`
  margin: 0;
  color: #111111;
  text-align: left;
`;

const StyledDeleteIcon = styled.img`
  display: block;
  margin: 0 auto;
  width: 14px;
  height: 14px;
`;

const StyledEditIcon = styled.img`
  display: block;
  margin: 12px auto;
  width: 14px;
  height: 14px;
`;

const StyledButton = styled(DisplayXSmall)`
  width: 100%;
  background: #000;
  color: #fff;
  padding: 8px 20px;
  text-align: center;
`;

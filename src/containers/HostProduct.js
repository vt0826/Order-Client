import React from 'react';
import {connect} from 'react-redux';
import {Mutation} from 'react-apollo';
import {navigate} from '@reach/router';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import styled from 'styled-components';

// Redux
import {
  setHostCampaignsIndex,
  campaignsRefetchFinished,
} from '../actionCreaters/campaignAction';
import {
  setAccountItems,
  accountItemsRefetchRequire,
  accountItemsRefetchFinished,
} from '../actionCreaters/itemAction';

// Asset
import DeleteIcon from '../assets/product-list/delete@2x.png';
import EditIcon from '../assets/product-list/edit@2x.png';

// React Component
import SearchBox from './SearchBox';
import {ListItemInfo} from '../components/ListItemInfo';

// Style
import {DisplayXSmall} from '../components/Typography';


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

const ACCOUNTITEMS = gql`
  query accountItems {
    accountItems {
      id
      name
      price
    }
  }
`;

const ADD_LIST_ITEM = gql`
  mutation addListItem($campaignId: ID!, $itemId: ID!) {
    addListItem(
      campaignId: $campaignId
      input: {listItems: {itemId: $itemId}}
    ) {
      status
      message
    }
  }
`;

const NEW_ITEM = gql`
  mutation newItem {
    newItem {
      id
      status
      message
    }
  }
`;

const REMOVE_ITEM = gql`
  mutation removeItem($itemId: ID!) {
    removeItem(itemId: $itemId) {
      status
      message
    }
  }
`;

class HostProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  redirectToCampaignPage() {}
  /* Redirect to Item page from given campaign id and item id */
  redirectToItemEditPage(itemId) {
    navigate('/item/' + itemId);
  }

  renderItemEdit(item) {
    if (this.props.campaignId) return null;
    return (
      <div className="col-2">
        <Mutation
          mutation={REMOVE_ITEM}
          variables={{
            itemId: item.id,
          }}
          refetchQueries={() => [
            {
              query: ACCOUNTITEMS,
            },
          ]}
          onCompleted={data => {
            if (data) {
              this.props.setItemfetchRequire();
            }
          }}>
          {(removeItem, {data, loading, error}) => (
            <StyledDeleteIcon src={DeleteIcon} onClick={removeItem} />
          )}
        </Mutation>

        <StyledEditIcon
          src={EditIcon}
          onClick={() => this.redirectToItemEditPage(item.id)}
        />
      </div>
    );
  }

  renderItemAddToCampaign(item) {
    if (!this.props.campaignId) return null;

    return (
      <div className="col-2">
        <Mutation
          mutation={ADD_LIST_ITEM}
          variables={{
            campaignId: this.props.campaignId,
            itemId: item.id,
          }}
          refetchQueries={() => [
            {
              query: CAMPAIGN,
              variables: {campaignId: this.props.campaignId},
            },
          ]}
          onCompleted={data => {
            if (data) {
              navigate('/manage/' + this.props.campaignId + '/product');
            }
          }}>
          {(addListItem, {data, loading, error}) => (
            <StyledDisplayXSmall onClick={addListItem}> Add to Campaign </StyledDisplayXSmall>
          )}
        </Mutation>
      </div>
    );
  }

  renderItems(accountItems) {
    if (!accountItems) return null;
    return accountItems.map(item => (
      <div className="col-md-6">
        <StyledProduct>
          <div className="row nested">
            <ListItemInfo
              redirectToItemPage={this.redirectToCampaignPage}
              item={item}
            />
            {this.renderItemEdit(item)}
            {this.renderItemAddToCampaign(item)}
          </div>
        </StyledProduct>
      </div>
    ));
  }

  renderAccountItems() {
    return (
      <Query
        query={ACCOUNTITEMS}
        fetchPolicy="cache-and-network"
        onCompleted={data => this.props.setAccountItems(data.accountItems)}>
        {({loading, error, data}) => {
          if (loading) return <div>loading</div>;
          if (error) return <div>error</div>;
          return (
            <React.Fragment>
              {this.renderItems(this.props.accountItems)}
              <Mutation
                mutation={NEW_ITEM}
                onCompleted={data => {
                  if (data) {
                    this.redirectToItemEditPage(data.newItem.id);
                  }
                }}>

                {(newItems, {data, loading, error}) => (
                  <div class="col-md-6 offset-md-3">
                    <StyledDisplayXSmall onClick={newItems}> NEW PRODUCT</StyledDisplayXSmall>
                  </div>
                )}

              </Mutation>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  render() {
    return (
      <React.Fragment>
        <SearchBox />
        <div className="row">
          {this.renderAccountItems()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  sessionToken,
  account,
  accountItems,
  accountItemsRefetchRequire,
  campaignsIndex,
  hostCampaigns,
  campaignsRefetchRequire,
  joinedCampaigns,
}) => {
  return {
    sessionToken,
    account,
    accountItems,
    accountItemsRefetchRequire,
    campaignsIndex,
    hostCampaigns,
    campaignsRefetchRequire,
    joinedCampaigns,
  };
};
const mapDispatchToProps = dispatch => ({
  //dispatch setHostCampaignsIndex to set host campaigns and dispatch hostCampaignsRefetchFinished
  setHostCampaignsIndex(campaigns) {
    dispatch(setHostCampaignsIndex(campaigns));
    dispatch(campaignsRefetchFinished());
  },

  //dispatch setAccountItems action to update accountItems reducer
  setAccountItems(items) {
    dispatch(setAccountItems(items));
    dispatch(accountItemsRefetchFinished());
  },

  setItemfetchRequire() {
    dispatch(accountItemsRefetchRequire());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HostProduct);

/*************************************************************
** Styled Components
*/
const StyledProduct = styled.div`
  padding: 0 0 20px 0;
  border-bottom: 1px solid #D8D8D8;
  margin:  0 0 20px 0;
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
const StyledDisplayXSmall = styled(DisplayXSmall)`
  padding: 8px 20px;
  background-color: #000;
  color: #fff;
  text-align: center;
  margin: 20px 0;
`;

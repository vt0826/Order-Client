import React from 'react';
import {connect} from 'react-redux';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import {
  setItem,
  itemRefetchRequire,
  accountItemsRefetchRequire,
  updateItemField,
} from '../actionCreaters/itemAction';

import ItemInfoEdit from './ItemInfoEdit';
import ItemPictureEdit from './ItemPictureEdit';
import ItemVariantEdit from './ItemVariantEdit';

import styled from 'styled-components';
import {DisplaySmall} from '../components/Typography';

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
        id
        url
      }
    }
  }
`;

class ItemEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
    };
  }

  //update forms's corresponding state
  handleInput = (field, event) => {
    const item = {field: field, value: event.target.value};
    this.props.updateItemField(item);
  };

  render() {
    const itemId = this.props.itemId;

    return (
      <StyledContainer className="container">
        <Query
          query={ITEM}
          variables={{itemId}}
          fetchPolicy="no-cache"
          onCompleted={data => this.props.setItem(data.item)}>
          {({loading, error, data}) => {
            if (loading) return <div>loading</div>;
            if (error) return <div>error</div>;

            return (
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <StyledForm as="form" id={this.props.page}>
                    <StyledDisplaySmall>Product Edit</StyledDisplaySmall>
                    <div className="row">
                      <div className="col-md-6">
                        <ItemInfoEdit campaignId={this.props.campaignId} />
                      </div>
                      <div className="col-md-6">
                        <ItemPictureEdit />
                        <ItemVariantEdit />
                      </div>
                    </div>
                  </StyledForm>
                </div>
              </div>
            );
          }}
        </Query>
      </StyledContainer>
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
    console.log(item);
    //dispatch(itemRefetchFinished());
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
)(ItemEdit);

/*
 ** Styled Components
 */

const StyledContainer = styled.section`
  padding-top: 68px;
`;

const StyledForm = styled.form``;

const StyledDisplaySmall = styled(DisplaySmall)`
  margin-bottom: 40px;
  color: #111111;
`;

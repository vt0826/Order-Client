import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

// Redux
import {
  setItem,
  itemRefetchRequire,
  addPictureUrl,
  removePictureUrl,
  accountItemsRefetchRequire,
  updateItemField,
} from '../actionCreaters/itemAction';
import {refetchRequire, refetchFinished} from '../actionCreaters/refetchAction';

// Assets
import addProductImage from '../assets/add-item-image@2x.png';
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';

// Style
import {DisplayXSmall} from '../components/Typography';

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

class ItemPictureEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  addPictureUrl(url) {
    this.props.addPictureUrl(url);
  }
  removePictureUrl(index) {
    this.props.removePictureUrl(index);
  }

  render() {
    const itemId = this.props.item.id;
    const url = '../url-placeholder';
    return (
      <Query
        query={ITEM}
        fetchPolicy="no-cache"
        variables={{itemId}}
        onCompleted={data => this.props.setItem(data.item)}>
        {({loading, error, data, refetch}) => {
          if (loading) return <div>loading</div>;
          if (error) return <div>error</div>;
          if (this.props.itemPictureRefetchRequire) {
            refetch();
          }
          return (
            <React.Fragment>
              <StyledDisplayXSmall className="inputLabel">
                IMAGE
              </StyledDisplayXSmall>
              <div className="row">
                {this.props.item.pictures.map((picture, index) => (
                  <div className="col-3">
                    <StyledImage
                      src={ProductPlaceholder}
                      onClick={() => this.removePictureUrl(index)}
                      alt="default"
                    />
                  </div>
                ))}
                <div className="col-3">
                  <StyledImage
                    src={addProductImage}
                    onClick={() => this.addPictureUrl(url)}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
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
    dispatch(refetchFinished(' SET_ITEM_PIC_REFETCH'));
  },
  updateItem(item) {
    dispatch(itemRefetchRequire());
    dispatch(accountItemsRefetchRequire());
  },
  editVariant() {
    dispatch(refetchRequire('SET_ITEM_PIC_REFETCH'));
  },
  updateItemField(item) {
    dispatch(updateItemField(item));
  },
  addPictureUrl(pictureUrl) {
    dispatch(addPictureUrl(pictureUrl));
  },
  removePictureUrl(index) {
    dispatch(removePictureUrl(index));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemPictureEdit);

/*
 ** Styled Components
 */
const StyledDisplayXSmall = styled(DisplayXSmall)`
  margin: 0 20px 0 0;
  color: #111111;
`;

const StyledImage = styled.img`
  width: 100%;
`;

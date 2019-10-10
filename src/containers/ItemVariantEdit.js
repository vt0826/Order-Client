import React from 'react';
import {connect} from 'react-redux';

import {
  itemRefetchRequire,
  updateItemField,
  addVariant,
  removeVariant,
} from '../actionCreaters/itemAction';
import styled from 'styled-components';
import {DisplayXSmall, TextMedium} from '../components/Typography';

class ItemVariantEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
    };
  }
  //update forms's corresponding state
  handleInput = (field, event) => {
    if (field === 'option') {
      this.setState({option: event.target.value});
    }
  };

  addVariant = () => {
    this.props.addVariant(this.state.option);
    this.setState({option: ''});
  };

  removeVariant(index) {
    this.props.removeVariant(index);
  }
  renderMapVariants(variant, itemId, index) {
    if (variant.option === 'default') return null;
    return (
      <React.Fragment>
        <StyledVariantTextMedium className="col-10">
          {variant.option}
        </StyledVariantTextMedium>
        <div className="col-2">
          <StyledButton type="button" onClick={() => this.removeVariant(index)}>
            -
          </StyledButton>
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (!this.props.item.variants || !this.props.item.variants.length)
      return null;
    const itemId = this.props.item.id;
    return (
      <React.Fragment>
        <StyledDiv>
          <StyledVariantDisplayXSmall className="inputLabel">
            VARIANTS
          </StyledVariantDisplayXSmall>
          <div className="row">
            {this.props.item.variants.map((variant, index) => (
              <React.Fragment>
                {this.renderMapVariants(variant, itemId, index)}
              </React.Fragment>
            ))}
            <StyledVariantInput
              className="col-10"
              as="input"
              id="newVariant"
              value={this.state.option}
              placeholder="Add New Variant"
              onChange={e => this.handleInput('option', e)}
            />
            <div className="col-2">
              <StyledButton type="button" onClick={this.addVariant}>
                +
              </StyledButton>
            </div>
          </div>
        </StyledDiv>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({item, itemRefetchRequire, campaign}) => {
  return {
    item,
    itemRefetchRequire,
    campaign,
  };
};

const mapDispatchToProps = dispatch => ({
  //dispatch setCampaign action to set campaign reducer
  editVariant() {
    dispatch(itemRefetchRequire());
  },
  updateItemField(item) {
    dispatch(updateItemField(item));
  },
  addVariant(option) {
    dispatch(addVariant(option));
  },
  removeVariant(index) {
    dispatch(removeVariant(index));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemVariantEdit);

/*
 ** Styled Components
 */
const StyledDiv = styled.div`
  margin-bottom: 28px;
`;

const StyledVariantDisplayXSmall = styled(DisplayXSmall)`
  text-transform: Uppdercase;
  display: inline-block;
  width: 100%;
  background: transparent;
  color: #111111;
  padding: 8px 0;
  margin-bottom: 20px;
  appearance: none;
  border-bottom: 1px solid #000000;
`;

const StyledVariantTextMedium = styled(TextMedium)`
  display: inline-block;
  text-transform: Capitalize;
  width: 100%;
  color: #111111;
`;

const StyledVariantInput = styled(TextMedium)`
  outline: none;
  text-transform: Capitalize;
  display: inline-block;
  width: 100%;
  background: transparent;
  height: 32px;
  padding-left: 0px;
  margin-bottom: 20px;
  appearance: none;
  border-radius: 0;
  border: none;
`;

const StyledButton = styled.button`
  border: 0.5px solid #536e5f;
  border-radius: 50%;
  display: inline-block;
`;

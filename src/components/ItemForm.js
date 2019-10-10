import React from 'react';
import styled from 'styled-components';

// Assets
import AddProductImage from '../assets/add-item-image@2x.png';
import ProductPlaceholder from '../assets/pkg-br-04-sq2_2048x.png';

// Style
import {
  DisplayMedium,
  DisplayXSmall,
  DisplaySmall,
  TextMedium,
  TextXLarge,
} from '../components/Typography';

export const ItemForm = props => {
  return (
    <React.Fragment>
      <StyledForm as="form" id={props.page} onSubmit={props.handleFormSubmit}>
        <StyledDisplaySmall>Product Edit</StyledDisplaySmall>

        <StyledCol>
          <StyledDisplayXSmall className="inputLabel">
            TITLE
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            type="text"
            id="name"
            value={props.item.name}
            placeholder="NATURAL BATH SOAP"
            onChange={e => props.handleInput('name', e)}
          />
        </StyledCol>

        <StyledCol>
          <StyledDisplayXSmall className="inputLabel">
            PRICE
          </StyledDisplayXSmall>
          <StyledInput
            as="input"
            id="price"
            value={props.item.price}
            type="number"
            placeholder="$ 1.00"
            onChange={e => props.handleInput('price', e)}
          />
        </StyledCol>

        <StyledCol>
          <StyledDisplayXSmall className="inputLabel">TAG</StyledDisplayXSmall>
          <StyledInput as="input" id="tag" type="text" placeholder="Salt Bat" />
        </StyledCol>

        <StyledCol>
          <StyledDisplayXSmall className="inputLabel">
            IMAGE
          </StyledDisplayXSmall>

          <StyledImage
            className="col-lg-3"
            src={ProductPlaceholder}
            alt="default"
          />
          <StyledImage className="col-lg-3" src={AddProductImage} />
        </StyledCol>

        <StyledCol>
          <StyledVariantDisplayXSmall className="inputLabel">
            VARIANTS
          </StyledVariantDisplayXSmall>

          {props.item.variants.map(variant => (
            <React.Fragment>
              <StyledVariantTextMedium className="col-lg-11">
                {variant.option}
              </StyledVariantTextMedium>
              <StyledButton>-</StyledButton>
            </React.Fragment>
          ))}

          <StyledVariantInput
            className="col-lg-11"
            as="input"
            id="fulfillReq"
            placeholder="Add New Variant"
          />
          <StyledButton>+</StyledButton>
        </StyledCol>
      </StyledForm>
    </React.Fragment>
  );
};

// Styled components

const StyledForm = styled.form`
  padding: 40px;
  color: #4e4e4e;
`;
const StyledCol = styled.div`
  margin-bottom: 28px;
`;

const StyledDisplaySmall = styled(DisplaySmall)`
  margin-bottom: 40px;
  color: #111111;
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
  color: #111111;
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
  border-radius: 12px;
  display: inline-block;
`;
const StyledImage = styled.img`
  width: 100%;
`;

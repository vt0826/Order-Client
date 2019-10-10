import React from 'react';
import styled from 'styled-components';

// Components
import {CurrencyFormat} from '../helper';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';

// Style
import {
  DisplayMedium,
  DisplayXSmall,
  DisplaySmall,
  TextMedium,
  TextLarge,
  TextXLarge,
  TextSmall,
} from '../components/Typography';

export const OrderDetail = props => {
  if (!props.order) return null;
  return (
    <React.Fragment>
      <StyledOrderRow>
        <StyledOrderNumberTextXLarge>
          ORDER {props.order.id}
        </StyledOrderNumberTextXLarge>
        <StyledTimeTextSmall>
          {props.order.campaign.pickupTime}
        </StyledTimeTextSmall>
        <StyledAddressTextSmall>
          {props.order.campaign.pickupAddress}
        </StyledAddressTextSmall>
      </StyledOrderRow>
      <div className="row">
        <div className="col-lg-6">
          {props.order.orderItems.map(item => (
            <StyledOrderRow className="row">
              <div className="col-lg-3">
                <StyledImage
                  key={props.order.id}
                  src={ProductPlaceholder}
                  alt="item"
                />
              </div>
              <div className="col-lg-9">
                <StyledItemTextXLarge> {item.item.name}</StyledItemTextXLarge>

                <StyledItemTextSmall>{item.variants.option}</StyledItemTextSmall>

                <StyledListItemRow>
                  <StyledItemQuantityTextMedium>
                    Quantity {item.quantity}
                  </StyledItemQuantityTextMedium>

                  <StyledItemPriceTextMedium>
                    {CurrencyFormat(item.item.price)}
                  </StyledItemPriceTextMedium>
                </StyledListItemRow>
              </div>
            </StyledOrderRow>
          ))}
          <StyledOrderRow>
            <StyledOrderNumberTextXLarge>Summary</StyledOrderNumberTextXLarge>
            <StyledListItemRow>
              <StyledItemQuantityTextMedium>Total</StyledItemQuantityTextMedium>

              <StyledItemPriceTextMedium>
                {CurrencyFormat(props.order.subTotal)}
              </StyledItemPriceTextMedium>
            </StyledListItemRow>
          </StyledOrderRow>
        </div>
      </div>
      <StyledOrderRow>
        <StyledOrderNumberTextXLarge>Note</StyledOrderNumberTextXLarge>
        <StyledInput placeholder="Thank you. These looks so good." />
      </StyledOrderRow>
      <button>Contact Host</button>
    </React.Fragment>
  );
};
// Styled components
const StyledImage = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const StyledTitleRow = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
  display: flex;
  direction: row;
  align-items: baseline;
  border-bottom: 1px solid #000000;
`;

const StyledTitleDisplaySmall = styled(DisplaySmall)`
  flex: 2;
`;
const StyledTitleTextSmall = styled(TextSmall)`
  text-align: right;
  flex: 2;
  a {
    color: #000;
    text-decoration: none;
    text-transform: capitalize;
  }
`;

const StyledOrderRow = styled.div`
  border-bottom: 1px solid #f7f7f7;
`;
const StyledOrderNumberRow = styled.div`
  border-bottom: 1px solid #f7f7f7;
  display: block;
`;
const StyledOrderNumberTextXLarge = styled(TextXLarge)`
  margin-bottom: 20px;
  padding: 0;
`;
const StyledTimeTextSmall = styled(TextSmall)`
  padding: 0;
`;
const StyledAddressTextSmall = styled(TextSmall)`
  padding: 0;

  margin-bottom: 20px;
`;

const StyledItemTextXLarge = styled(TextXLarge)`
  margin-top: 20px;
  text-transform: capitalize;
  padding: 0;
`;

const StyledItemTextSmall = styled(TextSmall)`
  margin-bottom: 20px;
  text-transform: capitalize;
  padding: 0;
`;
const StyledListItemRow = styled.div`
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  direction: row;
  align-items: baseline;
`;
const StyledItemQuantityTextMedium = styled(TextMedium)`
  margin-bottom: 20px;
  text-transform: capitalize;
  flex:2
  padding: 0;
`;
const StyledItemPriceTextMedium = styled(TextMedium)`
  text-align: right;
  text-transform: capitalize;

  flex:2
  padding: 0;
`;

const StyledOrderCol = styled.div`
  margin-bottom: 20px;
  padding: 0;
  background: #f8f8f8;
`;

const StyledDivRow = styled.div`
  margin-top: 60px;
`;

const StyledListRow = styled.div`
  margin-bottom: 20px;
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

const StyledTextLarge = styled(TextLarge)`
  margin: 0;
`;
const StyledDisplaySmall = styled(DisplaySmall)``;
const StyledDisplayXSmall = styled(DisplayXSmall)``;

import React from 'react';
import styled from 'styled-components';

// Assets
import ProductPlaceholder from '../assets/placeholder/pkg-br-04-sq2_2048x.jpg';


export const CartListItems = props => {
  return (
    <div className="row">
      <div className="col-3">
        {/*item.itemPicture*/}
        <StyledImage
          src={ProductPlaceholder}
          alt="item"
        />
      </div>
      <div className="col-9">
        <div className="row">
          <div className="col-10">
            <h4>{props.cart[props.campaign].listItems[props.item].itemName}</h4>
            <h5>{props.cart[props.campaign].listItems[props.item].option}</h5>
          </div>
          <div className="col-1">
            <button
              onClick={() =>
                props._removeFromCart(
                  props.campaign,
                  props.cart[props.campaign].listItems[props.item].variantId,
                )
              }>
              {' '}
              X{' '}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <button
              type="button"
              onClick={() =>
                props._quantityDecrease(
                  props.campaign,
                  props.cart[props.campaign].listItems[props.item].variantId,
                )
              }>
              -
            </button>
            <input
              name="quantity"
              value={props.cart[props.campaign].listItems[props.item].quantity}
            />
            <button
              type="button"
              onClick={() =>
                props._quantityIncrement(
                  props.campaign,
                  props.cart[props.campaign].listItems[props.item].variantId,
                )
              }>
              +
            </button>
          </div>
          <div className="col-5">
            <h5>$ {props.cart[props.campaign].listItems[props.item].amount}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
const StyledImage = styled.img`
  width: 100%;
`;

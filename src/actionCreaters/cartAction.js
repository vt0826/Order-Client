//set cart reducer
export function addToCart(payload) {
  return function addToCartThunk(dispatch, getState) {
    dispatch({
      type: 'ADD_TO_CART',
      payload: payload,
    });
  };
}

//add itemlist to cart
export function addToCartListItems(payload) {
  return function addToCartThunk(dispatch, getState) {
    dispatch({
      type: 'ADD_TO_CART_ITEM_LISTS',
      payload: payload,
    });
  };
}

export function updatePaymentStatusInCart(payload) {
  return function updatePaymentStatusInCart(dispatch, getState) {
    dispatch({
      type: 'UPDATE_PAYMENT_IN_CART',
      payload: payload,
    });
  };
}
export function updateNoteInCart(payload) {
  return function updateNoteInCart(dispatch, getState) {
    dispatch({
      type: 'UPDATE_NOTE_IN_CART',
      payload: payload,
    });
  };
}

//remove item from cart
export function removeItemFromCart(payload) {
  return function removeItemFromCartThunk(dispatch, getState) {
    dispatch({
      type: 'REMOVE_ITEM_FROM_CART',
      payload: payload,
    });
  };
}

//remove campaign from cart
export function removeCampaignFromCart(payload) {
  return function removeCampaignFromCartThunk(dispatch, getState) {
    dispatch({
      type: 'REMOVE_CAMPAIGN_FROM_CART',
      payload: payload,
    });
  };
}

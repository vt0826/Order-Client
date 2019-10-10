export function setCampaignOrders(payload) {
  return function setCampaignOrdersThunk(dispatch, getState) {
    dispatch({
      type: 'SET_CAMPAIGN_ORDERS',
      payload: payload,
    });
  };
}

export function setCampaignOrderSummary(payload) {
  return function setCampaignOrderSummaryThunk(dispatch, getState) {
    dispatch({
      type: 'SET_CAMPAIGN_ORDER_SUMMARY',
      payload: payload,
    });
  };
}

export function setAccountOrders(payload) {
  return function setAccountOrdersThunk(dispatch, getState) {
    dispatch({
      type: 'SET_ACCOUNT_ORDERS',
      payload: payload,
    });
  };
}

export function setOrder(payload) {
  return function setOrderThunk(dispatch, getState) {
    dispatch({
      type: 'SET_ORDER',
      payload: payload,
    });
  };
}

export function updateOrder(payload) {
  return function updateOrderThunk(dispatch, getState) {
    dispatch({
      type: 'UPDATE_ORDER',
      payload: payload,
    });
  };
}

export function order(state = '', action) {
  switch (action.type) {
    case 'SET_ORDER':
      return action.payload;
    case 'UPDATE_ORDER':
      const field = action.payload.field;
      return Object.assign({}, state, {[field]: action.payload.value});
    default:
      return state;
  }
}

export function campaignOrders(state = '', action) {
  if (action.type === 'SET_CAMPAIGN_ORDERS') {
    return action.payload;
  } else {
    return state;
  }
}

export function campaignOrderSummary(state = '', action) {
  if (action.type === 'SET_CAMPAIGN_ORDER_SUMMARY') {
    return action.payload;
  } else {
    return state;
  }
}

export function accountOrders(state = '', action) {
  if (action.type === 'SET_ACCOUNT_ORDERS') {
    return action.payload;
  } else {
    return state;
  }
}

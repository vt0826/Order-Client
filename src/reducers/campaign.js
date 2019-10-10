export function campaignsIndex(state = '', action) {
  if (action.type === 'GET_CAMPAIGNS_INDEX') {
    return action.payload;
  } else {
    return state;
  }
}

export function hostCampaigns(state = '', action) {
  if (action.type === 'SET_HOST_CAMPAIGNS_INDEX') {
    return action.payload;
  } else {
    return state;
  }
}

export function joinedCampaigns(state = '', action) {
  if (action.type === 'SET_JOINED_CAMPAIGNS_INDEX') {
    return action.payload;
  } else {
    return state;
  }
}

export function campaignsRefetchRequire(state = false, action) {
  if (action.type === 'SET_CAMPAIGNS_REFETCH') {
    return action.payload;
  } else {
    return state;
  }
}

export function campaignList(state = '', action) {
  if (action.type === 'GET_CAMPAIGN_LIST') {
    return action.payload;
  } else {
    return state;
  }
}

export function campaign(state = '', action) {
  switch (action.type) {
    case 'SET_CAMPAIGN':
      return action.payload;

    case 'UPDATE_CAMPAIGN':
      const field = action.payload.field;
      return Object.assign({}, state, {[field]: action.payload.value});
    default:
      return state;
  }
}

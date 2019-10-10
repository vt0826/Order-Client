export function setHostCampaignsIndex(payload) {
  return function setHostCampaignsIndexThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_HOST_CAMPAIGNS_INDEX',
      payload: payload,
    });
  };
}

export function campaignsRefetchRequire() {
  return function campaignsRefetchRequireThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_CAMPAIGNS_REFETCH',
      payload: true,
    });
  };
}

export function campaignsRefetchFinished() {
  return function campaignsRefetchFinishedThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_CAMPAIGNS_REFETCH',
      payload: false,
    });
  };
}

export function setJoinedCampaignsIndex(payload) {
  return function setJoinedCampaignsIndexThunk(dispatch, getState) {
    //  const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_JOINED_CAMPAIGNS_INDEX',
      payload: payload,
    });
  };
}

export function setCampaign(payload) {
  return function setCampaignThunk(dispatch, getState) {
    //const {campaign} = getState;
    dispatch({
      type: 'SET_CAMPAIGN',
      payload: payload,
    });
  };
}

export function updateCampaign(payload) {
  return function updateCampaignThunk(dispatch, getState) {
    dispatch({
      type: 'UPDATE_CAMPAIGN',
      payload: payload,
    });
  };
}

export function createCampaign(payload) {
  return function createCampaignThunk(dispatch, getState) {
    //  const {campaign} = getState;
  };
}

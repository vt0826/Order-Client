//set item reducer
export function setItem(payload) {
  return function setItemThunk(dispatch, getState) {
    dispatch({
      type: 'SET_ITEM',
      payload: payload,
    });
  };
}

export function updateItemField(payload) {
  return function updateItemFieldThunk(dispatch, getState) {
    dispatch({
      type: 'UPDATE_ITEM_FIELD',
      payload: payload,
    });
  };
}

export function itemRefetchRequire() {
  return function itemRefetchRequireThunk(dispatch, getState) {
    dispatch({
      type: 'SET_ITEM_REFETCH',
      payload: true,
    });
  };
}

export function itemRefetchFinished() {
  return function itemRefetchFinishedThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_ITEM_REFETCH',
      payload: false,
    });
  };
}

export function setAccountItems(payload) {
  return function setAccountItemsThunk(dispatch, getState) {
    //  const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_ACCOUNT_ITEMS',
      payload: payload,
    });
  };
}

export function accountItemsRefetchRequire() {
  return function itemRefetchRequireThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_ACCOUNT_ITEMS_REFETCH',
      payload: true,
    });
  };
}

export function accountItemsRefetchFinished() {
  return function itemRefetchFinishedThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'SET_ACCOUNT_ITEMS_REFETCH',
      payload: false,
    });
  };
}

export function addPictureUrl(pictureUrl) {
  return function addPictureUrlThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'ADD_PICTURE_URL',
      payload: pictureUrl,
    });
  };
}

export function removePictureUrl(index) {
  return function removePictureUrlThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'REMOVE_PICTURE_URL',
      payload: index,
    });
  };
}

export function addVariant(option) {
  return function addVariantThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'ADD_VARIANT',
      payload: option,
    });
  };
}

export function removeVariant(index) {
  return function removeVariantThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: 'REMOVE_VARIANT',
      payload: index,
    });
  };
}

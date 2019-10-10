export function refetchRequire(type) {
  return function refetchRequireThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: type,
      payload: true,
    });
  };
}

export function refetchFinished(type) {
  return function refetchFinishedThunk(dispatch, getState) {
    // const {campaignsIndex} = getState;
    dispatch({
      type: type,
      payload: false,
    });
  };
}

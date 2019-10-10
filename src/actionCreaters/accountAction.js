export function createAccount(payload) {
  return function createAccountThunk(dispatch, getState) {
    dispatch({type: 'CREATE_ACCOUNT', payload: payload});
  };
}

export function getAccount() {
  return function getAccountThunk(dispatch, getState) {
    dispatch({
      type: 'GET_ACCOUNT',
      payload: false,
    });
  };
}

export function signInAccount(payload) {
  return function signInAccountThunk(dispatch, getState) {
    dispatch({
      type: 'SIGNIN_ACCOUNT',
      payload: payload,
    });
  };
}

export function signOutAccount() {
  return function signOutAccountThunk(dispatch, getState) {
    dispatch({
      type: 'SIGNOUT_ACCOUNT',
      payload: false,
    });
  };
}

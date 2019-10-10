export function toggleMenu() {
  return function toggleMenuThunk(dispatch, getState) {
    dispatch({type: 'TOGGLE_MENU', payload: false});
  };
}

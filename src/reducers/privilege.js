export default function privilegeReducer(state = false, action) {
  if (action.type === 'SET_PRIVILEGE') {
    return action.payload;
  } else {
    return state;
  }
}

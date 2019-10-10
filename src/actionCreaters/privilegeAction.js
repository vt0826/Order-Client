export default function setPrivilege(members, accountEmail) {
  return function setPrivilegeThunk(dispatch, getState) {
    //const {privilage} = getState;
    const existMember = members.some(member => member.email === accountEmail);
    if (existMember) {
      dispatch({
        type: 'SET_PRIVILEGE',
        payload: 'member',
      });
    } else if (!existMember) {
      dispatch({
        type: 'SET_PRIVILEGE',
        payload: 'nonMember',
      });
    } else {
      dispatch({
        type: 'SET_PRIVILEGE',
        payload: false,
      });
    }
  };
}

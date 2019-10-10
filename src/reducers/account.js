export default function account(state = '', action) {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
      const accountInfoNew = {
        email: action.payload.email,
        displayName: action.payload.displayName,
      };
      localStorage.setItem('account', JSON.stringify(accountInfoNew));
      return action.payload;

    case 'GET_ACCOUNT':
      const accountInfo = localStorage.getItem('account')
        ? JSON.parse(localStorage.getItem('account'))
        : '';

      return accountInfo;

    case 'SIGNIN_ACCOUNT':
      const accountInfoAdd = {
        email: action.payload.email,
        displayName: action.payload.displayName,
      };
      localStorage.setItem('account', JSON.stringify(accountInfoAdd));
      return action.payload;

    case 'SIGNOUT_ACCOUNT':
      localStorage.removeItem('account');
      return state;

    default:
      return state;
  }
}

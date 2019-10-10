import ApolloClient from 'apollo-boost';
import serverConfig from './serverConfig';

export const Client = new ApolloClient({
  uri: serverConfig.app.uri,
  request: operation => {
    const accountEmail = localStorage.getItem('account')
      ? JSON.parse(localStorage.getItem('account')).email
      : '';
    operation.setContext({
      headers: {
        email: accountEmail,
      },
    });
  },
});

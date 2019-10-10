const env = process.env.NODE_ENV; // 'development' or 'production'

const development = {
  app: {
    /* Point to local order server */
    //uri: 'http://localhost:3000',
    /* Point to production order server NOTE: !!! USE WITH CAUTION */
    uri: 'https://order-web-server.herokuapp.com',
  },
};

const production = {
  app: {
    uri: 'https://order-web-server.herokuapp.com',
  },
};

const serverConfig = {
  development,
  production,
};

module.exports = serverConfig[env];

import React from 'react';
import {Router} from '@reach/router';
import {Provider as ReduxProvider} from 'react-redux';
import {ApolloProvider} from 'react-apollo';

//hook local storage with redux
import {PersistGate} from 'redux-persist/integration/react';
import {Store, Persistor} from './Store';

// Components
import {Client} from './Client';
import {Footer} from './components/Footer';
import {Landing} from './components/Landing';
import Header from './containers/Header';
import {SignUp} from './containers/SignUp';
import Campaigns from './containers/Campaigns';
import Host from './containers/Host';
import Campaign from './containers/Campaign';
import CampaignDetail from './containers/CampaignDetail';
import ManageCampaign from './containers/ManageCampaign';
import Item from './containers/Item';
import OrderList from './containers/OrderList';
import Order from './containers/Order';
import ItemEdit from './containers/ItemEdit';
import SignIn from './containers/SignIn';

// Style
import './stylesheets/grid/thyhive-grid.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ApolloProvider client={Client}>
        <ReduxProvider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            <Header/>
            <main>
              <Router>
                <Landing path="/" />
                <SignIn path="/sign-in" />
                <SignIn path="/sign-in/:campaignId" />
                <SignUp path="/signup" />
                <SignUp path="/signup/:campaignId" />
                <OrderList path="/orders" />
                <Order path="/orders/:orderId" />
                <ManageCampaign path="/manage/:campaignId/*" />
                <Campaigns path="/campaigns" />
                <Host path="/host/*" />
                <Campaign path="/campaign/:campaignId" />
                <CampaignDetail path="/campaigning/:campaignId" />
                <ItemEdit path="/item/:itemId" />
                <ItemEdit path="/item/:campaignId/:itemId" />
                <Item path="/campaign/:campaignId/:itemId" />
              </Router>
            </main>
            <Footer />
          </PersistGate>
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}

export default App;

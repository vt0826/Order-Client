import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import account from './account';
import headerMenuDisplay from './header';
import privilege from './privilege';

import {
  item,
  itemRefetchRequire,
  itemPictureRefetchRequire,
  itemVariantsRefetchRequire,
  accountItemsRefetchRequire,
  accountItems,
} from './item';
import cart from './cart';
import {
  campaignsIndex,
  campaignList,
  campaign,
  hostCampaigns,
  campaignsRefetchRequire,
  joinedCampaigns,
} from './campaign';
import {
  campaignOrders,
  campaignOrderSummary,
  accountOrders,
  order,
} from './order';

//import storage from 'redux-persist/lib/storage';

const appReducer = combineReducers({
  account,
  campaign,
  headerMenuDisplay,
  cart,
  item,
  itemRefetchRequire,
  itemPictureRefetchRequire,
  itemVariantsRefetchRequire,
  accountItemsRefetchRequire,
  accountItems,
  accountOrders,
  hostCampaigns,
  campaignsRefetchRequire,
  joinedCampaigns,
  campaignsIndex,
  campaignList,
  order,
  campaignOrders,
  campaignOrderSummary,
  privilege,
});

const rootReducer = (state, action) => {
  //when user log out remove the local storage and set the redux states to undefine
  if (action.type === 'SIGNOUT_ACCOUNT') {
    storage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;

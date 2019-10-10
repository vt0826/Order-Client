const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const campaignId = action.payload.campaignId;
      return Object.assign({}, state, {[campaignId]: action.payload});

    case 'ADD_TO_CART_ITEM_LISTS':
      const campaignsId = action.payload.campaignId;
      const variantId = action.payload.variantId;

      return Object.assign({}, state, {
        [campaignsId]: Object.assign({}, state[campaignsId], {
          listItems: Object.assign({}, state[campaignsId].listItems, {
            [variantId]: action.payload.item[variantId],
          }),
        }),
      });

    case 'UPDATE_PAYMENT_IN_CART':
      const paymentCampaignsId = action.payload.campaignId;
      return Object.assign({}, state, {
        [paymentCampaignsId]: Object.assign({}, state[paymentCampaignsId], {
          payment: action.payload.payment,
        }),
      });
    case 'UPDATE_NOTE_IN_CART':
      const noteCampaignsId = action.payload.campaignId;
      return Object.assign({}, state, {
        [noteCampaignsId]: Object.assign({}, state[noteCampaignsId], {
          note: action.payload.note,
        }),
      });

    case 'REMOVE_ITEM_FROM_CART':
      let itemCart = state;
      delete itemCart[action.payload.campaignId].listItems[
        action.payload.variantId
      ];
      return Object.assign({}, itemCart);

    case 'REMOVE_CAMPAIGN_FROM_CART':
      let cart = state;
      delete cart[action.payload];
      return Object.assign({}, cart);

    default:
      return state;
  }
}

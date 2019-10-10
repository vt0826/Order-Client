export function item(state = '', action) {
  console.log('IN REDUCER');
  console.log(action);
  switch (action.type) {
    case 'SET_ITEM':
      console.log(action.payload);
      return action.payload;

    case 'UPDATE_ITEM_FIELD':
      const field = action.payload.field;
      return Object.assign({}, state, {[field]: action.payload.value});

    case 'ADD_PICTURE_URL':
      return {
        ...state,
        pictures: [...state.pictures, {url: action.payload}],
      };

    case 'REMOVE_PICTURE_URL':
      let pictures = state.pictures;
      pictures.splice(action.payload, 1);
      return {
        ...state,
        pictures,
      };

    case 'ADD_VARIANT':
      return {
        ...state,
        variants: [...state.variants, {option: action.payload}],
      };

    case 'REMOVE_VARIANT':
      let variants = state.variants;
      variants.splice(action.payload, 1);
      return {
        ...state,
        variants,
      };

    default:
      return state;
  }
}

export function accountItems(state = '', action) {
  if (action.type === 'SET_ACCOUNT_ITEMS') {
    return action.payload;
  } else {
    return state;
  }
}

export function itemRefetchRequire(state = false, action) {
  if (action.type === 'SET_ITEM_REFETCH') {
    return action.payload;
  } else {
    return state;
  }
}
export function itemPictureRefetchRequire(state = false, action) {
  if (action.type === 'SET_ITEM_PIC_REFETCH') {
    return action.payload;
  } else {
    return state;
  }
}
export function itemVariantsRefetchRequire(state = false, action) {
  if (action.type === 'SET_ITEM_VARIANTS_REFETCH') {
    return action.payload;
  } else {
    return state;
  }
}
export function accountItemsRefetchRequire(state = false, action) {
  if (action.type === 'SET_ACCOUNT_ITEMS_REFETCH') {
    return action.payload;
  } else {
    return state;
  }
}

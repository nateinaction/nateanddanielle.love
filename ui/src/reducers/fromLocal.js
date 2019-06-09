/* global window:true */

const defaultState = {
  endpoint: window.dataOnPageLoad.endpoint,
  nonce: window.dataOnPageLoad.nonce,
  title: window.dataOnPageLoad.title,
  menu: {
    open: false,
    items: window.dataOnPageLoad.menu,
  },
};

const fromLocal = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return Object.assign({}, state, {
        menu: {
          open: !state.menu.open,
          items: state.menu.items,
        },
      });
    default:
      return state;
  }
};

export default fromLocal;

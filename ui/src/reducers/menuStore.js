/* global window:true */

const defaultState = {
  menu: {
    open: false,
    items: window.dataOnPageLoad.menu,
  },
};

const menuStore = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU_VISIBILITY':
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

export default menuStore;

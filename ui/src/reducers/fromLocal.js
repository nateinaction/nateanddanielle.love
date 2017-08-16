const defaultObj = () => {
  if (typeof window.lexiConfig === 'undefined') {
    return {
      endpoint: process.env.REACT_APP_ENDPOINT,
      nonce: '',
      title: 'Development Site',
      menu: {
        open: false,
        items: ['test', 'test2']
      }
    }
  }
  return {
    endpoint: window.lexiConfig.endpoint,
    nonce: window.lexiConfig.nonce,
    title: window.lexiConfig.title,
    menu: {
      open: false,
      items: window.lexiConfig.menu
    }
  }
}

const fromLocal = (state = defaultObj(), action) => {
	switch (action.type) {
    case 'OPEN_MENU':
      return Object.assign({}, state, {
        'menu': {
          open: !state.menu.open,
          items: state.menu.items
        }
      })
		default:
			return state
	}
}

export default fromLocal

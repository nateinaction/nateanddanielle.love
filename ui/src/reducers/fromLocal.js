const defaultObj = () => {
  if (typeof window.lexiConfig === 'undefined') {
    return {
      endpoint: process.env.REACT_APP_ENDPOINT,
      nonce: '',
      title: 'Development Site',
      menu: []
    }
  }
  return {
    endpoint: window.lexiConfig.endpoint,
    nonce: window.lexiConfig.nonce,
    title: window.lexiConfig.title,
    menu: window.lexiConfig.menu
  }
}

const fromLocal = (state = defaultObj(), action) => {
	switch (action.type) {
		default:
			return state
	}
}

export default fromLocal

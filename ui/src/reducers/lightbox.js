const defaultObj = {
  images: [],
  isOpen: false
}

const lightbox = (state = defaultObj, action) => {
	switch (action.type) {
		case 'OPEN_LIGHTBOX':
      return Object.assign({}, state, {
        images: action.imagesArray,
        isOpen: true
      })
    case 'CLOSE_LIGHTBOX':
      return Object.assign({}, state, {
        isOpen: false
      })
		default:
			return state
	}
}

export default lightbox

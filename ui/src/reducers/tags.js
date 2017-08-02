/* @flow */

const fetchTagsHelper = (state, action) => {
	let response = Object.assign({}, state)
	action.keys.forEach((key) => {
		Object.assign(response, {
			[key]: {
				fetching: true
			}
		})
	})
	return response
}

const setTagsHelper = (state, action) => {
	let response = Object.assign({}, { fetching: false }, state)
	action.tags.forEach((tag, index) => {
		tag.fetching = false
		response = Object.assign(response, { [tag.id]: tag })
	})
	return response
}

const tags = (state = {}, action) => {
	switch (action.type) {
		case 'FETCHING_TAGS':
      return fetchTagsHelper(state, action)
		case 'SET_TAGS':
			return setTagsHelper(state, action)
		default:
			return state
	}
}

export default tags

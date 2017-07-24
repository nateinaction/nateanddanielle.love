const posts = (state = {fetching: false, posts: []}, action) => {
	switch (action.type) {
		case 'FETCHING_POSTS':
      return Object.assign({}, state, {
        fetching: true
      })
		case 'SET_POSTS':
      return Object.assign({}, state, {
        fetching: false,
        posts: state.posts.concat(action.posts)
      })
		default:
			return state
	}
}

export default posts

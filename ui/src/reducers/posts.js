const organizePosts = (state, action) => {
	let posts = state.posts.concat(action.posts)
	posts.sort((a, b) => {
		let aDate = new Date(a.date)
		let bDate = new Date(b.date)
	  return bDate - aDate
	});
	return posts
}

const posts = (state = {fetching: false, posts: []}, action) => {
	switch (action.type) {
		case 'FETCHING_POSTS':
      return Object.assign({}, state, {
        fetching: true
      })
		case 'SET_POSTS':
      return Object.assign({}, state, {
        fetching: false,
        posts: organizePosts(state, action)
      })
		default:
			return state
	}
}

export default posts

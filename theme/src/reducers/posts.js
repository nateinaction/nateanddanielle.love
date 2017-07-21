/*
const helper = (state, action) => {
	const message = action.message || ''
	const posts = action.posts || []
	const fetching = (posts.length === 0 && message.length === 0)
	return Object.assign({}, state, {
		[action.subreddit]: {
			fetching,
			posts,
			message
		}
	})
}
*/

const posts = (state = {fetching: false}, action) => {
	switch (action.type) {
		case 'FETCHING_POSTS':
      return Object.assign({}, state, {
        fetching: true
      })
		case 'SET_POSTS':
      return Object.assign({}, state, {
        fetching: false,
        posts: action.posts
      })
		default:
			return state
	}
}

export default posts

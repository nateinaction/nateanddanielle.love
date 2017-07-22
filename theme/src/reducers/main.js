import { combineReducers } from 'redux'

import posts from './posts'
import media from './media'

/*
posts: {
	fetching: false,
	posts: [
		{post1_obj},
		{post2_obj}
	]
},
media: {
	ID1: {
		fetching: false,
		media: {media_obj}
	},
	ID2: {
		fetching: false,
		media: {media_obj}
	}
}
*/

const reducers = combineReducers({
	posts,
  media
})

export default reducers

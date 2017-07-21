import { combineReducers } from 'redux'

import posts from './posts'
import media from './media'

/*
posts: {
  fetching: false,
	post: {
    type: image,
		img: {
      src: image.png,
      fetching: false
    },
		title: Post Title,
		contents: '<tag>html</tag>'
	}
}
*/

const reducers = combineReducers({
	posts,
  media
})

export default reducers

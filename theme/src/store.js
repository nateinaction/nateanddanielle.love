import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers/main'

//import fetchPosts from './actions/fetchPosts'

/*
 * Redux Store
 */

let store = createStore(reducers, applyMiddleware(
	thunk
))

export default store

/*
 * Redux state to console log
 */

console.log('initial state')
console.log(store.getState())
store.subscribe(() => console.log(store.getState()))

/*
store.dispatch(fetchPosts())
store.dispatch(fetchPosts(2))
*/
//store.dispatch(fetchPosts('before', '2016-06-12T08:10:12Z'))

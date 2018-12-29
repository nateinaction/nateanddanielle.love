/* @flow */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/main';

// import fetchTags from './actions/fetchTags'

/*
 * Redux Store
 */

const store = createStore(reducers, applyMiddleware(
  thunk,
));

export default store;

/*
 * Redux state to console log
 */

// console.log('initial state');
// console.log(store.getState());
// store.subscribe(() => console.log(store.getState()));

/*
store.dispatch(fetchPosts())
store.dispatch(fetchPosts(2))
*/
// store.dispatch(fetchTags([12,17]))

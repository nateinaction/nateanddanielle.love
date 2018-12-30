/* eslint-disable no-undef */

import { createStore } from 'redux';
import fetchPostsStore from './fetchPostsStore';
import setFetchedPosts from '../actions/setFetchedPosts';
import setFetchingPosts from '../actions/setFetchingPosts';

test('fetchPostsStore responds correctly to actions', () => {
  window.dataOnPageLoad = {
    fetchPostsStore: {
      earliestPossible: '2013-09-15T15:37:25',
      latestPossible: '2018-12-15T20:02:17',
    },
  };

  const store = createStore(fetchPostsStore);

  const expectedState = {
    latestPossible: {
      date: '2018-12-15T20:02:17',
    },
    earliestPossible: {
      date: '2013-09-15T15:37:25',
    },
    latestFetched: {
      fetching: false,
    },
    earliestFetched: {
      fetching: false,
    },
  };

  // Test default state
  expect(store.getState()).toEqual(expectedState);

  // Test fetching later posts
  store.dispatch(setFetchingPosts('later'));
  expectedState.latestFetched.fetching = true;
  expect(store.getState()).toEqual(expectedState);

  // Test fetching earlier posts
  store.dispatch(setFetchingPosts('earlier'));
  expectedState.earliestFetched.fetching = true;
  expect(store.getState()).toEqual(expectedState);

  // Test setting later posts
  store.dispatch(setFetchedPosts('later', '2019-12-15T20:02:17'));
  expectedState.latestFetched.fetching = false;
  expectedState.latestFetched.date = '2019-12-15T20:02:17';
  expect(store.getState()).toEqual(expectedState);

  // Test setting earlier posts
  store.dispatch(setFetchedPosts('earlier', '2019-12-15T20:02:17'));
  expectedState.earliestFetched.fetching = false;
  expectedState.earliestFetched.date = '2019-12-15T20:02:17';
  expect(store.getState()).toEqual(expectedState);

  // Test fetching posts with no arg
  store.dispatch(setFetchingPosts());
  expectedState.latestFetched.fetching = true;
  expect(store.getState()).toEqual(expectedState);
});

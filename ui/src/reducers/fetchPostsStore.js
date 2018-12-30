/* global window:true */

/**
 * The fetchPostsStore store is used to record the earliest and latest dates for all fetched posts.
 * It also records the earliest and latest possible dates for any posts. Using this information
 * we can know when to fetch new posts and when all posts have been fetched.
 * http://www.hawking.org.uk/the-beginning-of-time.html
 *
 * Data structure:
 * {
 *   earliestPossible: {
 *     date: "2013-09-15T15:37:25", // Provided by WordPress on pageload
 *   },
 *   earliestFetched: {
 *     fetching: false,
 *     date: "2018-05-25T21:07:58", // Updated each time an earlier post is fetched
 *   },
 *   latestPossible: {
 *     date: "2018-12-15T20:02:17", // Provided by WordPress on pageload
 *   },
 *   latestFetched: {
 *     fetching: false,
 *     date: "2018-12-15T20:02:17", // Updated each time an later post is fetched
 *   },
 * }
 */

const defaultState = () => ({
  latestPossible: {
    date: window.dataOnPageLoad.fetchPostsStore.latestPossible,
  },
  earliestPossible: {
    date: window.dataOnPageLoad.fetchPostsStore.earliestPossible,
  },
  latestFetched: {
    fetching: false,
  },
  earliestFetched: {
    fetching: false,
  },
});

const fetchPostsStore = (state = defaultState(), action) => {
  switch (action.type) {
    case 'FETCHING_EARLIER_POSTS':
      return Object.assign({}, state, {
        earliestFetched: Object.assign({}, state.earliestFetched, {
          fetching: true,
        }),
      });
    case 'FETCHING_LATER_POSTS':
      return Object.assign({}, state, {
        latestFetched: Object.assign({}, state.latestFetched, {
          fetching: true,
        }),
      });
    case 'SET_EARLIEST_POST_FETCHED':
      return Object.assign({}, state, {
        earliestFetched: Object.assign({}, state.earliestFetched, {
          fetching: false,
          date: action.date,
        }),
      });
    case 'SET_LATEST_POST_FETCHED':
      return Object.assign({}, state, {
        latestFetched: Object.assign({}, state.latestFetched, {
          fetching: false,
          date: action.date,
        }),
      });
    default:
      return state;
  }
};

export default fetchPostsStore;

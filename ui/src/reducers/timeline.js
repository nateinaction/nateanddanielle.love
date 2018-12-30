/**
 * The timeline store is used to record the earliest and latest dates for all fetched posts.
 * It also records the earliest and latest possible dates for any posts. Using this information
 * we can know when to fetch new posts and when all posts have been fetched.
 * http://www.hawking.org.uk/the-beginning-of-time.html
 *
 * Data structure:
 * {
 *   earliestPossible: {
 *     fetching: false,
 *     date: "2013-09-15T15:37:25", // Provided by WordPress on pageload
 *   },
 *   earliestFetched: {
 *     fetching: false,
 *     date: "2018-05-25T21:07:58", // Updated each time an earlier post is fetched
 *   },
 *   latestPossible: {
 *     fetching: false,
 *     date: "2018-12-15T20:02:17", // Provided by WordPress on pageload
 *   },
 *   latestFetched: {
 *     fetching: false,
 *     date: "2018-12-15T20:02:17", // Updated each time an later post is fetched
 *   },
 * }
 */

const defaultTimeline = {
  latest: {
    fetching: false,
  },
  earliest: {
    fetching: false,
  },
  latestLoaded: {
    fetching: false,
  },
  earliestLoaded: {
    fetching: false,
  },
};

const timeline = (state = defaultTimeline, action) => {
  switch (action.type) {
    case 'FETCHING_TIMELINE':
      return Object.assign(state, {
        latest: {
          fetching: true,
        },
        earliest: {
          fetching: true,
        },
      });
    case 'FETCHING_POSTS':
      return Object.assign(state, {
        latestLoaded: Object.assign(state.latestLoaded, {
          fetching: true,
        }),
        earliestLoaded: Object.assign(state.latestLoaded, {
          fetching: true,
        }),
      });
    case 'SET_POSTS':
      return Object.assign(state, {
        latestLoaded: {
          fetching: false,
          date: action.date.latestLoaded,
        },
        earliestLoaded: {
          fetching: false,
          date: action.date.earliestLoaded,
        },
      });
    case 'SET_TIMELINE':
    case 'UPDATE_TIMELINE':
      return Object.assign(state, action.timeline);
    default:
      return state;
  }
};

export default timeline;

/**
 * The Posts store stores all posts as objects in an array.
 *
 * @param {*} state
 * @param {*} action
 */
const posts = (state = [], action) => {
  switch (action.type) {
    case 'SET_EARLIEST_POST_FETCHED':
      return state.concat(action.posts);
    case 'SET_LATEST_POST_FETCHED':
      return action.posts.concat(state);
    default:
      return state;
  }
};

export default posts;

const setFetchedPosts = (timeDirection, date, posts) => {
  if (timeDirection === 'later') {
    return {
      type: 'SET_LATEST_POST_FETCHED',
      date,
      posts,
    };
  }
  return {
    type: 'SET_EARLIEST_POST_FETCHED',
    date,
    posts,
  };
};

export default setFetchedPosts;

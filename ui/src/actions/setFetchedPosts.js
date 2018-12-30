// Should I validate date here?

const setFetchedPosts = (timeDirection, date) => {
  if (timeDirection === 'earlier') {
    return {
      type: 'SET_EARLIEST_POST_FETCHED',
      date,
    };
  }
  return {
    type: 'SET_LATEST_POST_FETCHED',
    date,
  };
};

export default setFetchedPosts;

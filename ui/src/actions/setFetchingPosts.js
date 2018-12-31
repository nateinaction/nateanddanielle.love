const setFetchingPosts = (timeDirection) => {
  if (timeDirection === 'later') {
    return {
      type: 'FETCHING_LATER_POSTS',
    };
  }
  return {
    type: 'FETCHING_EARLIER_POSTS',
  };
};

export default setFetchingPosts;

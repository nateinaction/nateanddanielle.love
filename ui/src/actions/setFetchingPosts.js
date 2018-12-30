const setFetchingPosts = (timeDirection) => {
  if (timeDirection === 'earlier') {
    return {
      type: 'FETCHING_EARLIER_POSTS',
    };
  }
  return {
    type: 'FETCHING_LATER_POSTS',
  };
};

export default setFetchingPosts;

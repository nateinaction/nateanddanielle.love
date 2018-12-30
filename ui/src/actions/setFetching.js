const setFetching = (itemType, itemInfo) => {
  if (itemType === 'posts') {
    return {
      type: 'FETCHING_POSTS',
    };
  } if (itemType === 'media') {
    return {
      type: 'FETCHING_MEDIA',
      keys: itemInfo,
    };
  } if (itemType === 'timeline') {
    return {
      type: 'FETCHING_TIMELINE',
    };
  }
  return null;
};

export default setFetching;

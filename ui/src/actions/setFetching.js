const setFetching = (item_type, item_info) => {
  if (item_type === 'posts') {
    return {
    	type: 'FETCHING_POSTS',
    };
  } if (item_type === 'media') {
    return {
    	type: 'FETCHING_MEDIA',
      keys: item_info,
    };
  } if (item_type === 'timeline') {
    return {
    	type: 'FETCHING_TIMELINE',
    };
  } if (item_type === 'tags') {
    return {
    	type: 'FETCHING_TAGS',
      keys: item_info,
    };
  }
};

export default setFetching;

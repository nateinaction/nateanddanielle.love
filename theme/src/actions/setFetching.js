const setFetching = (item_type, item_info) => {
  if (item_type === 'posts') {
    return {
    	type: 'FETCHING_POSTS'
    }
  } else if (item_type === 'media') {
    return {
    	type: 'FETCHING_MEDIA',
      keys: item_info
    }
  }
}

export default setFetching

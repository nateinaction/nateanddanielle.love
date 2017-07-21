import axios from 'axios';

import setFetching from './setFetching'
import setPosts from './setPosts'
import fetchMedia from './fetchMedia'

const fetchPosts = (page = 1) => (
  (dispatch) => {
    dispatch(setFetching('posts'))

    const url = `https://nateanddanielle.love/wp-json/wp/v2/posts`
    const config = {
      params: {
        page
      }
    }
    return axios(url, config)
			.then(res => {
        let mediaArray = res.data.map((post) => (
          post.featured_media
        ))
        //console.log(mediaArray)
        dispatch(fetchMedia(mediaArray))
				return dispatch(setPosts(res.data))
			})
		  .catch(err => {
				if (err) console.log(err)
		  	return
		  });
  }
)

export default fetchPosts

import axios from 'axios';

import setFetching from './setFetching'
import setPosts from './setPosts'
import fetchMedia from './fetchMedia'

const fetchPosts = (timeDirection = 'before', date = new Date().toISOString()) => (
  (dispatch, getState) => {
    dispatch(setFetching('posts'))

    const url = `https://nateanddanielle.love/wp-json/wp/v2/posts`
    const config = {
      params: {
        [timeDirection]: date
      }
    }
    return axios(url, config)
			.then(res => {
        let mediaArray = res.data.map((post) => (
          post.featured_media
        ))
        dispatch(fetchMedia(mediaArray))

        let timeline = {}
        if ( timeDirection === 'before' ) {
          timeline.latestLoaded = getState().timeline.latestLoaded.date || res.data[0].date
          timeline.earliestLoaded = res.data[res.data.length - 1].date
        } else {
          timeline.latestLoaded = res.data[0].date
          timeline.earliestLoaded = getState().timeline.earliestLoaded.date || res.data[res.data.length - 1].date
        }

				return dispatch(setPosts(timeDirection, res.data, timeline))
			})
		  .catch(err => {
				if (err) console.log(err)
		  	return
		  });
  }
)

export default fetchPosts

import axios from 'axios';

import setFetching from './setFetching'
import setMedia from './setMedia'

const fetchMedia = (mediaArray) => (
  (dispatch) => {
    dispatch(setFetching('media', mediaArray))

    const url = `https://nateanddanielle.love/wp-json/wp/v2/media`
    const config = {
      params: {
        include: mediaArray.join()
      }
    }
    return axios(url, config)
			.then(res => (
				dispatch(setMedia(res.data))
			))
		  .catch(err => {
				if (err) console.log(err)
		  	return
		  });
  }
)

export default fetchMedia

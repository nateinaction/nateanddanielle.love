import axios from 'axios';

import setFetching from './setFetching'
import setTags from './setTags'

const fetchTags = (tagArray) => (
  (dispatch, getState) => {
    dispatch(setFetching('tags', tagArray))

    // only fetch tags not already in state
    let { tags } = getState()
    let tagsToGet = tagArray.filter(itemID => (
      (typeof tags[itemID].id === 'undefined')
    ))

    if (tagsToGet.length !== 0) {
      const url = `https://nateanddanielle.love/wp-json/wp/v2/tags`
      const config = {
        params: {
          include: tagsToGet.join()
        }
      }
      return axios(url, config)
  			.then(res => {
  				return dispatch(setTags(res.data))
  			})
  		  .catch(err => {
  				if (err) console.log(err)
  		  	return
  		  });
    }
  }
)

export default fetchTags

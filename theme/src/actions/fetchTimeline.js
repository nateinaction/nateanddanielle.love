import axios from 'axios';

import setFetching from './setFetching'
import setTimeline from './setTimeline'

const fetchTimeline = (order = 'desc') => (
  (dispatch) => {
    dispatch(setFetching('timeline'))

    const url = `https://nateanddanielle.love/wp-json/wp/v2/posts`
    const config = {
      params: {
        per_page: '1',
        order
      }
    }
    return axios(url, config)
      .then(res => {
        if (order === 'desc') {
          dispatch(fetchTimeline('asc'))
        }
        return dispatch(setTimeline({
          earliest: {
            fetching: false,
            date: res.data[0].date
          }
        }))
      })
      .catch(err => {
        if (err) console.log(err)
        return
      });
  }
)

export default fetchTimeline

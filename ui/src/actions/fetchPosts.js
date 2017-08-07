import axios from 'axios';

import setFetching from './setFetching'
import setPosts from './setPosts'
import fetchMedia from './fetchMedia'
import fetchTags from './fetchTags'

const fetchPosts = (timeDirection = 'before', date = new Date().toISOString()) => (
  (dispatch, getState) => {
    dispatch(setFetching('posts'))

    const url = `${getState().fromLocal.endpoint}/wp/v2/posts`
    const config = {
      params: {
        [timeDirection]: date
      }
    }
    return axios(url, config)
			.then(res => {

        let content = {
          media: [],
          tags: []
        }
        res.data.forEach(post => {
          content.media.push(post.featured_media)

          // filter out duplicates
          content.tags = content.tags.concat(post.tags.filter(tag => {
            return (content.tags.indexOf(tag) === -1)
          }))
        })

        dispatch(fetchTags(content.tags))
        dispatch(fetchMedia(content.media))

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

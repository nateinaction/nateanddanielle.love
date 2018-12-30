import axios from 'axios';

import setFetching from './setFetching';
import setPosts from './setPosts';
import fetchMedia from './fetchMedia';

const fetchPosts = (timeDirection = 'before', date = new Date().toISOString()) => (
  (dispatch, getState) => {
    dispatch(setFetching('posts'));

    const url = `${getState().fromLocal.endpoint}wp/v2/posts`;
    const config = {
      params: {
        [timeDirection]: date,
      },
    };
    return axios(url, config)
      .then((res) => {
        const content = {
          media: [],
          tags: [],
        };
        res.data.forEach((post) => {
          content.media.push(post.featured_media);

          // filter out duplicates
          content.tags = content.tags.concat(
            post.tags.filter(
              tag => (content.tags.indexOf(tag) === -1),
            ),
          );
        });

        dispatch(fetchMedia(content.media));

        const timeline = {};
        if (timeDirection === 'before') {
          timeline.latestLoaded = getState().timeline.latestLoaded.date || res.data[0].date;
          timeline.earliestLoaded = res.data[res.data.length - 1].date;
        } else {
          const stateEarliestLoaded = getState().timeline.earliestLoaded.date;
          const resEarliestLoaded = res.data[res.data.length - 1].date;
          timeline.latestLoaded = res.data[0].date;
          timeline.earliestLoaded = stateEarliestLoaded || resEarliestLoaded;
        }

        return dispatch(setPosts(timeDirection, res.data, timeline));
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }
);

export default fetchPosts;

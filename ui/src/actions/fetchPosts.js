import axios from 'axios';
import setFetchingPosts from './setFetchingPosts';
import fetchMedia from './fetchMedia';
import setFetchedPosts from './setFetchedPosts';

/**
 * Requests more posts from the WordPress API.
 * When posts are received, fetch tags and media.
 *
 * @param {*} timeDirection
 * @param {*} earliestFetchedDate
 * @param {*} latestFetchedDate
 */
const fetchPosts = (
  timeDirection = 'earlier',
  earliestFetchedDate = new Date().toISOString(),
  latestFetchedDate = new Date().toISOString(),
) => (
  (dispatch, getState) => {
    const { fromLocal, fetchPostsStore } = getState();
    const { earliestFetched, latestFetched } = fetchPostsStore;

    // Put together URL to fetch more posts
    const wordpressTimeDirection = (timeDirection === 'later') ? 'after' : 'before';
    const date = (timeDirection === 'later') ? latestFetchedDate : earliestFetchedDate;
    const url = `${fromLocal.endpoint}wp/v2/posts`;
    const config = {
      params: {
        [wordpressTimeDirection]: date,
      },
    };

    // Fetch more posts
    dispatch(setFetchingPosts(timeDirection));
    return axios(url, config)
      .then((res) => {
        // Each post could have additional content which may need to be fetched
        const contentToFetch = {
          media: [],
          tags: [],
        };
        res.data.forEach((post) => {
          contentToFetch.media.push(post.featured_media);
          contentToFetch.tags.concat(post.tags);
        });
        dispatch(fetchMedia(contentToFetch.media));

        // If fetchPostsStore is missing earliestFetched.date or latestFetched.date, set them
        const haveEarliestFetchedDate = Object.prototype.hasOwnProperty.call(earliestFetched, 'date');
        const haveLatestFetchedDate = Object.prototype.hasOwnProperty.call(latestFetched, 'date');
        if (!haveEarliestFetchedDate || !haveLatestFetchedDate) {
          const oppositeTimeDirection = (timeDirection === 'later') ? 'earlier' : 'later';
          const oppositeNewDate = (timeDirection === 'later') ? res.data[res.data.length - 1].date : res.data[0].date;
          dispatch(setFetchedPosts(oppositeTimeDirection, oppositeNewDate, []));
        }

        // Update fetchPostsStore and Posts store
        const newDate = (timeDirection === 'later') ? res.data[0].date : res.data[res.data.length - 1].date;
        return dispatch(setFetchedPosts(timeDirection, newDate, res.data));
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }
);

export default fetchPosts;

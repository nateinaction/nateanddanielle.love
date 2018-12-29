import axios from 'axios';

import setFetching from './setFetching';
import setTags from './setTags';

const fetchTags = tagArray => (
  (dispatch, getState) => {
    dispatch(setFetching('tags', tagArray));

    // only fetch tags not already in state
    const { tags } = getState();
    const tagsToGet = tagArray.filter(itemID => (
      (typeof tags[itemID].id === 'undefined')
    ));

    if (tagsToGet.length !== 0) {
      const url = `${getState().fromLocal.endpoint}wp/v2/tags`;
      const config = {
        params: {
          include: tagsToGet.join(),
        },
      };
      return axios(url, config)
        .then(res => dispatch(setTags(res.data)))
        .catch((err) => {
          if (err) console.error(err);
        });
    }
    return null;
  }
);

export default fetchTags;

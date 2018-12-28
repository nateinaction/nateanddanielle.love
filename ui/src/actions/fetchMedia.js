import axios from 'axios';

import setFetching from './setFetching';
import setMedia from './setMedia';

const fetchMedia = mediaArray => (
  (dispatch, getState) => {
    dispatch(setFetching('media', mediaArray));

    const url = `${getState().fromLocal.endpoint}wp/v2/media`;
    const config = {
      params: {
        include: mediaArray.join(),
      },
    };
    return axios(url, config)
      .then(res => (
        dispatch(setMedia(res.data))
      ))
		  .catch((err) => {
        if (err) console.log(err);
		  });
  }
);

export default fetchMedia;

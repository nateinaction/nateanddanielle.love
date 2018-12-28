/* @flow */

const fetchMediaHelper = (state, action) => {
  const response = Object.assign({}, state);
  action.keys.forEach((key) => {
    Object.assign(response, {
      [key]: {
        fetching: true,
      },
    });
  });
  return response;
};

const setMediaHelper = (state, action) => {
  let response = Object.assign({}, state);
  action.media.forEach((item, index) => {
    item.fetching = false;
    response = Object.assign(response, { [item.id]: item });
  });
  return response;
};

const media = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHING_MEDIA':
      return fetchMediaHelper(state, action);
    case 'SET_MEDIA':
      return setMediaHelper(state, action);
    default:
      return state;
  }
};

export default media;

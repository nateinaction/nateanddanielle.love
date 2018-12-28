const setPosts = (timeDirection, posts, date) => ({
  type: 'SET_POSTS',
  timeDirection,
  posts,
  date,
});

export default setPosts;

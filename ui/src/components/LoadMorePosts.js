import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadMorePosts.css';

/**
 * LoadMorePosts is a button that, on click, will send an action to fetch more posts from the API.
 * It should be disabled if we are fetching new posts or invisible if the datastore already contains
 * the latest/earliest posts available.
 *
 * @param {*} props
 */
const LoadMorePosts = (props) => {
  const {
    timeDirection,
    earliestPossible,
    latestPossible,
    latestFetched,
    earliestFetched,
  } = props;

  // Don't show if we have not yet fetched posts
  const haveFetchedLatest = Object.prototype.hasOwnProperty.call(latestFetched, 'date');
  const haveFetchedEarliest = Object.prototype.hasOwnProperty.call(earliestFetched, 'date');
  if (!haveFetchedLatest || !haveFetchedEarliest) {
    return null;
  }

  // Don't show button when datastore already contains the latest/earliest posts available
  const haveEarliestAvailable = moment(earliestFetched.date).isSameOrBefore(earliestPossible.date);
  const haveLatestAvailable = moment(latestFetched.date).isSameOrAfter(latestPossible.date);
  if (timeDirection === 'earlier' && haveEarliestAvailable) {
    return null;
  } if (timeDirection === 'later' && haveLatestAvailable) {
    return null;
  }

  // Disable button when we are fetching new posts
  let disabled = false;
  if (timeDirection === 'earlier' && earliestFetched.fetching) {
    disabled = true;
  } if (timeDirection === 'later' && latestFetched.fetching) {
    disabled = true;
  }
  return (
    <Grid item className="load-more">
      <Button
        color="primary"
        variant="contained"
        className={`load-more-${props.timeDirection}`}
        disabled={disabled}
        onClick={() => props.fetchPosts(
          props.timeDirection,
          earliestFetched.date,
          latestFetched.date,
        )}
      >
        {(!disabled) ? 'Load More' : <CircularProgress color="primary" size={24} className="load-more-progress" />}
      </Button>
    </Grid>
  );
};

LoadMorePosts.propTypes = {
  timeDirection: PropTypes.string.isRequired,
  latestPossible: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
  earliestPossible: PropTypes.shape({
    date: PropTypes.string,
  }).isRequired,
  latestFetched: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    date: PropTypes.string,
  }).isRequired,
  earliestFetched: PropTypes.shape({
    fetching: PropTypes.bool.isRequired,
    date: PropTypes.string,
  }).isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

export default LoadMorePosts;

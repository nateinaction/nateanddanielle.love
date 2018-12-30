import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './LoadMore.css';

const LoadMore = (props) => {
  const config = {
    disabled: false,
    message: 'Load More',
  };
  if (props.timeDirection === 'after' && props.timeline.latestLoaded.date === props.timeline.latest.date) {
    return <div />;
  }
  if (props.timeDirection === 'before' && props.timeline.earliestLoaded.date === props.timeline.earliest.date) {
    config.disabled = true;
    config.message = 'The beginning...';
  }
  return (
    <Grid item className="load-more">
      <Button
        color="primary"
        variant="contained"
        className={`load-more-${props.timeDirection}`}
        disabled={config.disabled}
        onClick={() => props.fetchPosts(props.timeDirection, props.timeline.earliestLoaded.date)}
      >
        {config.message}
      </Button>
    </Grid>
  );
};

LoadMore.propTypes = {
  timeDirection: PropTypes.string.isRequired,
  timeline: PropTypes.shape({
    latest: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      date: PropTypes.string,
    }).isRequired,
    earliest: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      date: PropTypes.string,
    }).isRequired,
    latestLoaded: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      date: PropTypes.string,
    }).isRequired,
    earliestLoaded: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

export default LoadMore;

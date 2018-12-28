import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../styles/components/LoadMore.css';

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
        raised
        color="primary"
        className={`more ${props.timeDirection}`}
        disabled={config.disabled}
        onClick={() => props.fetchPosts(props.timeDirection, props.timeline.earliestLoaded.date)}
      >
        {config.message}
      </Button>
    </Grid>
  );
};

export default LoadMore;

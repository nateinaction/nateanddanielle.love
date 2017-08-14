import React from 'react';
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button';
import '../styles/components/LoadMore.css'

const LoadMore = (props) => {
  let config = {
    disabled: false,
    message: 'Load More'
  }
  if (props.timeDirection === 'after' && props.timeline.latestLoaded.date === props.timeline.latest.date) {
    return <div></div>
  }
  if (props.timeDirection === 'before' && props.timeline.earliestLoaded.date === props.timeline.earliest.date) {
    config.disabled = true
    config.message = 'The beginning...'
  }
  return (
    <Grid item xs={12} className={'load-more'}>
      <Button
        raised
        color="primary"
        className={'more ' + props.timeDirection}
        disabled={config.disabled}
        onClick={() => props.fetchPosts(props.timeDirection, props.timeline.earliestLoaded.date)} >
        {config.message}
      </Button>
    </Grid>
  )
}

export default LoadMore;

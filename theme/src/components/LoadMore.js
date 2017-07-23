import React from 'react';
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button';
//import '../styles/components/LoadMore.css'

const LoadMore = (props) => (
  <Grid item xs={12}>
    <Button
      raised
      color="primary"
      className={'more'}
      onClick={() => props.fetchPosts('before', props.timeline.earliestLoaded.date)} >
      {'Load More'}
    </Button>
  </Grid>
)

export default LoadMore;

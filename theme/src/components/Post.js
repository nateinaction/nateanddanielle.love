import React from 'react';
import Grid from 'material-ui/Grid'
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import moment from 'moment'
import PostImage from './PostImage'
import '../styles/components/Post.css'

const Post = (props) => (
  <Grid item xs={12}>
    <Card className={'post'}>
      <CardMedia>
        <PostImage
          fetching={props.media.fetching}
          media={props.media} />
      </CardMedia>
      <CardContent>
        <Typography
          type="headline"
          component="h2"
          dangerouslySetInnerHTML={{ __html: props.post.title.rendered }} />
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: props.post.content.rendered }} />
        <Typography
          type='caption'
          component="p" >
          {moment(props.post.date).format('dddd, MMMM Do YYYY')}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
)

export default Post;

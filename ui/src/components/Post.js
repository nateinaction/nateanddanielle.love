import React, { Component } from 'react';
import Grid from 'material-ui/Grid'
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import moment from 'moment'
import PostImage from './PostImage'
import '../styles/components/Post.css'

class Post extends Component {
  componentDidMount() {
    this.width = document.getElementsByClassName('post')[0].clientWidth
  }

  render() {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className={'post'}>
          <CardMedia>
            <PostImage
              fetching={this.props.media.fetching}
              media={this.props.media}
              width={this.width} />
          </CardMedia>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              dangerouslySetInnerHTML={{ __html: this.props.post.title.rendered }} />
            <Typography
              component="p"
              dangerouslySetInnerHTML={{ __html: this.props.post.content.rendered }} />
            <Typography
              type='caption'
              component="p" >
              {moment(this.props.post.date).format('dddd, MMMM Do YYYY')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export default Post;

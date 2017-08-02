import React, { Component } from 'react';
import Grid from 'material-ui/Grid'
import Card from 'material-ui/Card';
import PostImage from './PostImage'
import PostContent from './PostContent'
import '../styles/components/Post.css'

class Post extends Component {
  componentDidMount() {
    this.width = document.getElementsByClassName('post')[0].clientWidth
  }

  render() {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className={'post'}>
          <PostImage
            fetching={this.props.media.fetching}
            media={this.props.media}
            width={this.width}
            openLightbox={this.props.openLightbox} />
          <PostContent
            post={this.props.post}
            tags={this.props.tags} />
        </Card>
      </Grid>
    )
  }
}

export default Post;

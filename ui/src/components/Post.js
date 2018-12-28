import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PostMedia from './PostMedia';
import PostContent from './PostContent';
import '../styles/components/Post.css';

class Post extends Component {
  componentDidMount() {
    this.width = document.getElementsByClassName('post')[0].clientWidth;
  }

  render() {
    return (
      <Grid item className="post">
        <Card>
          <PostMedia
            fetching={this.props.media.fetching}
            media={this.props.media}
            post={this.props.post}
            width={this.width}
            openLightbox={this.props.openLightbox}
          />
          <PostContent
            post={this.props.post}
            tags={this.props.tags}
          />
        </Card>
      </Grid>
    );
  }
}

export default Post;

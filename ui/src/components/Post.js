/* global document:true */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lexi_embed: PropTypes.shape({
      embed: PropTypes.bool,
      embed_code: PropTypes.string,
    }),
    title: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  tags: PropTypes.shape({
    fetching: PropTypes.bool,
  }).isRequired,
  media: PropTypes.shape({
    fetching: PropTypes.bool,
    alt_text: PropTypes.string,
    media_details: PropTypes.object,
    mime_type: PropTypes.string,
  }).isRequired,
  openLightbox: PropTypes.func.isRequired,
};

export default Post;

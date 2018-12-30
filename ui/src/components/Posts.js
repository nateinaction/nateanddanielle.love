import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Lightbox from 'react-images';

import fetchTimeline from '../actions/fetchTimeline';
import fetchPosts from '../actions/fetchPosts';
import openLightbox from '../actions/openLightbox';
import closeLightbox from '../actions/closeLightbox';

import Post from './Post';
import LoadMore from './LoadMore';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchTimeline();
  }

  render() {
    if (this.props.posts.posts.length === 0) {
      return (
        <Grid container direction="column" align="center" className="loading">
          <CircularProgress size={150} className="progress" />
        </Grid>
      );
    }
    return (
      <Grid container className="posts" direction="column" align="center">
        <LoadMore
          timeDirection="after"
          timeline={this.props.timeline}
          fetchPosts={this.props.fetchPosts}
        />
        <Grid item xs={12} sm={9} md={8} lg={6}>
          <Grid container>
            {this.props.posts.posts.map(post => (
              <Post
                key={post.id}
                post={post}
                media={this.props.media[post.featured_media]}
                tags={this.props.tags}
                openLightbox={this.props.openLightbox}
              />
            ))}
          </Grid>
        </Grid>
        <LoadMore
          timeDirection="before"
          timeline={this.props.timeline}
          fetchPosts={this.props.fetchPosts}
        />
        <Lightbox
          images={this.props.lightbox.images}
          isOpen={this.props.lightbox.isOpen}
          onClose={() => this.props.closeLightbox()}
          backdropClosesModal
          showImageCount={false}
        />
      </Grid>
    );
  }
}
Posts.propTypes = {
  media: PropTypes.objectOf(PropTypes.object).isRequired,
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
  lightbox: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  posts: PropTypes.shape({
    fetching: PropTypes.bool,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  closeLightbox: PropTypes.func.isRequired,
  openLightbox: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchTimeline: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  timeline: state.timeline,
  posts: state.posts,
  media: state.media,
  lightbox: state.lightbox,
});

const mapDispatchToProps = dispatch => ({
  fetchTimeline: () => dispatch(fetchTimeline()),
  fetchPosts: (timeDirection, date) => dispatch(fetchPosts(timeDirection, date)),
  openLightbox: imagesArray => dispatch(openLightbox(imagesArray)),
  closeLightbox: () => dispatch(closeLightbox()),
});

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);

export default PostsContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetchPosts from '../actions/fetchPosts';
import openLightbox from '../actions/openLightbox';
import closeLightbox from '../actions/closeLightbox';
import Post from './Post';
import LoadMorePosts from './LoadMorePosts';

class Posts extends Component {
  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.fetchPosts();
    }
  }

  render() {
    if (this.props.posts.length === 0) {
      return (
        <Grid container direction="column" align="center" className="loading">
          <CircularProgress size={150} className="progress" />
        </Grid>
      );
    }
    return (
      <Grid container className="posts" direction="column" align="center">
        <LoadMorePosts
          timeDirection="later"
          latestPossible={this.props.fetchPostsStore.latestPossible}
          earliestPossible={this.props.fetchPostsStore.earliestPossible}
          latestFetched={this.props.fetchPostsStore.latestFetched}
          earliestFetched={this.props.fetchPostsStore.earliestFetched}
          fetchPosts={this.props.fetchPosts}
        />
        <Grid item xs={12} sm={9} md={8} lg={6}>
          <Grid container>
            {this.props.posts.map(post => (
              <Post
                key={post.id}
                post={post}
                media={this.props.media[post.featured_media]}
                openLightbox={this.props.openLightbox}
              />
            ))}
          </Grid>
        </Grid>
        <LoadMorePosts
          timeDirection="earlier"
          latestPossible={this.props.fetchPostsStore.latestPossible}
          earliestPossible={this.props.fetchPostsStore.earliestPossible}
          latestFetched={this.props.fetchPostsStore.latestFetched}
          earliestFetched={this.props.fetchPostsStore.earliestFetched}
          fetchPosts={this.props.fetchPosts}
        />
      </Grid>
    );
  }
}
Posts.propTypes = {
  media: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchPostsStore: PropTypes.shape({
    latestPossible: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
    earliestPossible: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
    latestFetched: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      date: PropTypes.string,
    }).isRequired,
    earliestFetched: PropTypes.shape({
      fetching: PropTypes.bool.isRequired,
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
  lightbox: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeLightbox: PropTypes.func.isRequired,
  openLightbox: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fetchPostsStore: state.fetchPostsStore,
  posts: state.posts,
  media: state.media,
  lightbox: state.lightbox,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (timeDirection, earliestFetchedDate, latestFetchedDate) => dispatch(
    fetchPosts(timeDirection, earliestFetchedDate, latestFetchedDate),
  ),
  openLightbox: imagesArray => dispatch(openLightbox(imagesArray)),
  closeLightbox: () => dispatch(closeLightbox()),
});

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);

export default PostsContainer;

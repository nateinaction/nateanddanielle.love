import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetchPosts from '../actions/fetchPosts';
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
        <Grid item xs={12} sm={9} md={8} lg={6}>
          <LoadMorePosts
            timeDirection="later"
            latestPossible={this.props.fetchPostsStore.latestPossible}
            earliestPossible={this.props.fetchPostsStore.earliestPossible}
            latestFetched={this.props.fetchPostsStore.latestFetched}
            earliestFetched={this.props.fetchPostsStore.earliestFetched}
            fetchPosts={this.props.fetchPosts}
          />
          <Grid container>
            {this.props.posts.map(post => (
              <Post
                key={post.id}
                post={post}
                media={this.props.media[post.featured_media]}
              />
            ))}
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
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fetchPostsStore: state.fetchPostsStore,
  posts: state.posts,
  media: state.media,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (timeDirection, earliestFetchedDate, latestFetchedDate) => dispatch(
    fetchPosts(timeDirection, earliestFetchedDate, latestFetchedDate),
  ),
});

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);

export default PostsContainer;

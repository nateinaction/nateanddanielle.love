import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import fetchTimeline from '../actions/fetchTimeline'
import fetchPosts from '../actions/fetchPosts'
import Post from '../components/Post'
import LoadMore from '../components/LoadMore'
import '../styles/containers/Posts.css'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchTimeline()
  }

  render() {
    if (this.props.posts.posts.length === 0) {
      return (
        <Grid container gutter={24} className={'loading'}>
          <CircularProgress size={150} className={'progress'} />
        </Grid>
      );
    }
    return (
      <Grid container gutter={24} className={'posts'}>
        <LoadMore
          timeDirection={'after'}
          timeline={this.props.timeline}
          fetchPosts={this.props.fetchPosts} />
        {this.props.posts.posts.map((post, index) => (
          <Post
            key={index}
            post={post}
            media={this.props.media[post.featured_media]} />
        ))}
        <LoadMore
          timeDirection={'before'}
          timeline={this.props.timeline}
          fetchPosts={this.props.fetchPosts} />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  posts: state.posts,
  media: state.media
})

const mapDispatchToProps = (dispatch) => ({
  fetchTimeline: () => dispatch(fetchTimeline()),
  fetchPosts: (timeDirection, date) => dispatch(fetchPosts(timeDirection, date))
})

const PostsContainer = connect(
  mapStateToProps,
	mapDispatchToProps
)(Posts)

export default PostsContainer

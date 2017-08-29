import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Lightbox from 'react-images'

import fetchTimeline from '../actions/fetchTimeline'
import fetchPosts from '../actions/fetchPosts'
import openLightbox from '../actions/openLightbox'
import closeLightbox from '../actions/closeLightbox'

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
        <Grid container gutter={24} direction={'column'} align={'center'} className={'loading'}>
          <CircularProgress size={150} className={'progress'} />
        </Grid>
      );
    }
    return (
      <Grid container className={'posts'} direction={'column'} align={'center'} gutter={24} >
        <LoadMore
          timeDirection={'after'}
          timeline={this.props.timeline}
          fetchPosts={this.props.fetchPosts} />
        <Grid item xs={12} sm={9} md={8} lg={6}>
          <Grid container>
          {this.props.posts.posts.map((post, index) => (
            <Post
              key={index}
              post={post}
              media={this.props.media[post.featured_media]}
              tags={this.props.tags}
              openLightbox={this.props.openLightbox} />
          ))}
          </Grid>
        </Grid>
        <LoadMore
          timeDirection={'before'}
          timeline={this.props.timeline}
          fetchPosts={this.props.fetchPosts} />
        <Lightbox
          images={this.props.lightbox.images}
          isOpen={this.props.lightbox.isOpen}
          onClose={() => this.props.closeLightbox()}
          backdropClosesModal={true}
          showImageCount={false} />
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  posts: state.posts,
  media: state.media,
  tags: state.tags,
  lightbox: state.lightbox
})

const mapDispatchToProps = (dispatch) => ({
  fetchTimeline: () => dispatch(fetchTimeline()),
  fetchPosts: (timeDirection, date) => dispatch(fetchPosts(timeDirection, date)),
  openLightbox: (imagesArray) => dispatch(openLightbox(imagesArray)),
  closeLightbox: () => dispatch(closeLightbox())
})

const PostsContainer = connect(
  mapStateToProps,
	mapDispatchToProps
)(Posts)

export default PostsContainer

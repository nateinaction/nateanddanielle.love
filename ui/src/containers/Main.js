import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import fetchPosts from '../actions/fetchPosts'
import '../styles/containers/Main.css'

class Main extends Component {
  render() {
    return (
      <Grid container gutter={24}>
        <p>poke</p>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  media: state.media
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (page) => dispatch(fetchPosts(page))
})

const MainContainer = connect(
  mapStateToProps,
	mapDispatchToProps
)(Main)

export default MainContainer

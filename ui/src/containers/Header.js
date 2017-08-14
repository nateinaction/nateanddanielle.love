import React, { Component } from 'react';
import { connect } from 'react-redux'
import fetchMedia from '../actions/fetchMedia'
import '../styles/components/Header.css'

const headerID = [249]

const headerStyle = (maxWidth, imageDetails) => {
  // find available sizes for a given image
  let availableSizes = [200,400,600,800,1200,1400,1600,1800,2000].filter(size => {
    return (typeof imageDetails.sizes[size] !== 'undefined')
  })

  let featuredSize = availableSizes.find(size => {
    return maxWidth <= size;
  }) || 'full'

  // create response
  let response = {
    height: '30rem',
    backgroundImage: 'url(' + imageDetails.sizes[featuredSize].source_url + ')',
  }
  return response
}

class Header extends Component {
  componentDidMount() {
    this.props.fetchMedia(headerID)
    this.width = document.getElementsByClassName('header')[0].clientWidth
  }

  render() {
    if (typeof this.props.media[headerID[0]] !== 'undefined' && !this.props.media[headerID[0]].fetching) {
      let divStyle = headerStyle(this.width, this.props.media[headerID[0]].media_details)
      return <div className={'header'} style={divStyle} />
    }
    return <div className={'header'} ></div>
  }
}

const mapStateToProps = (state) => ({
  media: state.media,
})

const mapDispatchToProps = (dispatch) => ({
  fetchMedia: (mediaArray) => dispatch(fetchMedia(mediaArray))
})

const HeaderContainer = connect(
  mapStateToProps,
	mapDispatchToProps
)(Header)

export default HeaderContainer;

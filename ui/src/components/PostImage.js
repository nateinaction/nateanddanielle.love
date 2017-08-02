import React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import { CardMedia } from 'material-ui/Card';
import '../styles/components/PostImage.css'

const srcSize = (media, width) => {
  let availableSizes = [200,400,600,800,1200].filter(size => {
    return (typeof media.sizes[size] !== 'undefined')
  })
  let srcset = availableSizes.map(size => {
    return media.sizes[size].source_url + ' ' + size + 'w'
  })
  let response = {
    featuredSize: availableSizes.find(size => {
      return width <= size;
    }),
    src: media.sizes['full'].source_url,
    srcset
  }
  return response
}

const PostImage = (props) => {
  if (props.fetching) {
    return (
      <LinearProgress className={'fetching'} />
    )
  }
  return (
    <CardMedia>
      <img
        className='post-image'
        src={props.media.media_details.sizes[srcSize(props.media.media_details, props.width).featuredSize].source_url}
        alt={props.media.alt_text}
        onClick={() => props.openLightbox([srcSize(props.media.media_details, props.width)])} />
    </CardMedia>
  )
}

export default PostImage;

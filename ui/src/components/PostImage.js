import React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import '../styles/components/PostImage.css'

const srcSize = (width, sizes) => {
  let availableSizes = [200,400,600,800,1200].filter(size => {
    return (typeof sizes[size] !== 'undefined')
  })
  let returnSize = availableSizes.find(size => {
    return width <= size;
  })
  return returnSize || 'full'
}

const PostImage = (props) => {
  if (props.fetching) {
    return (
      <LinearProgress className={'fetching'} />
    )
  }
  return (
    <img src={props.media.media_details.sizes[srcSize(props.width, props.media.media_details.sizes)].source_url} alt={props.media.alt_text} />
  )
}

export default PostImage;

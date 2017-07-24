import React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import '../styles/components/PostImage.css'

const PostImage = (props) => {
  if (props.fetching) {
    return (
      <LinearProgress className={'fetching'} />
    )
  }
  return (
    <img src={props.media.source_url} alt={props.media.alt_text} />
  )
}

export default PostImage;

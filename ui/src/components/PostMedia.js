import React from 'react';
// import { LinearProgress } from 'material-ui/Progress';
import CardMedia from '@material-ui/core/CardMedia';
import PostImage from './PostImage';
import '../styles/components/PostMedia.css';

const PostMedia = (props) => {
  if (props.post.lexi_embed.embed) {
    const embedCode = {
      __html: props.post.lexi_embed.embed_code,
    };
    return (
      <CardMedia>
        <div className="embed-container" dangerouslySetInnerHTML={embedCode} />
      </CardMedia>
    );
  }

  return (
    <PostImage
      fetching={props.media.fetching}
      media={props.media}
      width={props.width}
      openLightbox={props.openLightbox}
    />
  );
};

export default PostMedia;

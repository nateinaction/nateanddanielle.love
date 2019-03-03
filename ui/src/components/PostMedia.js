/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import PostImage from './PostImage';
import './PostMedia.css';

const PostMedia = (props) => {
  if (props.post.lexi_embed.embed) {
    const embedCode = {
      __html: props.post.lexi_embed.embed_code,
    };
    return (
      <div className="embed-container" dangerouslySetInnerHTML={embedCode} />
    );
  }

  return (
    <PostImage
      media={props.media}
      width={props.width}
    />
  );
};

PostMedia.propTypes = {
  media: PropTypes.shape({
    fetching: PropTypes.bool,
    alt_text: PropTypes.string,
    media_details: PropTypes.object,
    mime_type: PropTypes.string,
  }).isRequired,
  post: PropTypes.shape({
    lexi_embed: PropTypes.shape({
      embed: PropTypes.bool,
      embed_code: PropTypes.string,
    }),
  }).isRequired,
  width: PropTypes.number,
};

PostMedia.defaultProps = {
  width: 0,
};

export default PostMedia;

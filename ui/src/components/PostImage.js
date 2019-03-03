import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardMedia from '@material-ui/core/CardMedia';
import './PostImage.css';

const srcSize = (imageType, maxWidth, imageDetails) => {
  // Apparently GIFs are no longer animated after WP scales them so we always serve full size
  let response = {
    featured: imageDetails.sizes.full.source_url,
    src: imageDetails.sizes.full.source_url,
  };

  if (imageType !== 'image/gif') {
    // find available sizes for a given image
    const availableSizes = [200, 400, 600, 800, 1200, 1400, 1600, 1800, 2000].filter(size => (typeof imageDetails.sizes[size] !== 'undefined'));

    // grab the size of the featured image and deliver other sizes to srcset
    const featuredSize = availableSizes.find(size => maxWidth <= size) || 'full';
    const srcset = availableSizes.map(size => `${imageDetails.sizes[size].source_url} ${size}w`);

    // create response
    response = {
      featured: imageDetails.sizes[featuredSize].source_url,
      src: imageDetails.sizes.full.source_url,
      srcset,
    };
  }

  return response;
};

const PostImage = (props) => {
  // if fetching show loading bar
  if (props.media.fetching) {
    return (
      <LinearProgress className="fetching" />
    );
  }

  // else get image object and return
  const media = {
    type: props.media.mime_type,
    maxWidth: props.width,
    details: props.media.media_details,
  };
  const image = srcSize(media.type, media.maxWidth, media.details);
  return (
    <div>
      <CardMedia
        title={props.media.alt_text}
        src={image.featured}
        component="img"
      />
    </div>
  );
};

PostImage.propTypes = {
  media: PropTypes.shape({
    fetching: PropTypes.bool,
    alt_text: PropTypes.string,
    media_details: PropTypes.object,
    mime_type: PropTypes.string,
  }).isRequired,
  width: PropTypes.number,
};

PostImage.defaultProps = {
  width: 0,
};

export default PostImage;

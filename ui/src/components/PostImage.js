import React from 'react';
import { LinearProgress } from 'material-ui/Progress';
import { CardMedia } from 'material-ui/Card';
import '../styles/components/PostImage.css'

const srcSize = (imageType, maxWidth, imageDetails) => {
  // Apparently GIFs are no longer animated after WP scales them so we always serve full size
  let response = {
    featured: imageDetails.sizes['full'].source_url,
    src: imageDetails.sizes['full'].source_url,
  }

  if (imageType !== "image/gif") {
    // find available sizes for a given image
    let availableSizes = [200,400,600,800,1200,1400,1600,1800,2000].filter(size => {
      return (typeof imageDetails.sizes[size] !== 'undefined')
    })

    // grab the size of the featured image and deliver other sizes to srcset
    let featuredSize = availableSizes.find(size => {
      return maxWidth <= size;
    }) || 'full'
    let srcset = availableSizes.map(size => {
      return imageDetails.sizes[size].source_url + ' ' + size + 'w'
    })

    // create response
    response = {
      featured: imageDetails.sizes[featuredSize].source_url,
      src: imageDetails.sizes['full'].source_url,
      srcset
    }
  }

  return response
}

const PostImage = (props) => {
  // if fetching show loading bar
  if (props.fetching) {
    return (
      <LinearProgress className={'fetching'} />
    )
  }

  // else get image object and return
  let media = {
    type: props.media.mime_type,
    maxWidth: props.width,
    details: props.media.media_details,
  }
  let image = srcSize(media.type, media.maxWidth, media.details)
  return (
    <CardMedia>
      <img
        className='post-image'
        src={image.featured}
        alt={props.media.alt_text}
        onClick={() => props.openLightbox([image])} />
    </CardMedia>
  )
}

export default PostImage;

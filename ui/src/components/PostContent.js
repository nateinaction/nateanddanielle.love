import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PostMeta from './PostMeta';

const PostContent = props => (
  <CardContent>
    <Typography
      gutterBottom
      variant="h5"
      component="h2"
      dangerouslySetInnerHTML={{ __html: props.post.title.rendered }}
    />
    <Typography
      variant="body2"
      component="p"
      dangerouslySetInnerHTML={{ __html: props.post.content.rendered }}
    />
    <PostMeta
      date={props.post.date}
    />
  </CardContent>
);

PostContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lexi_embed: PropTypes.shape({
      embed_code: PropTypes.string,
    }),
    title: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.shape({
      rendered: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default PostContent;

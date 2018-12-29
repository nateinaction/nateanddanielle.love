import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
// import Tags from './Tags'
import moment from 'moment';
// import '../styles/components/PostMeta.css'

const PostMeta = props => (
  <div className="post-meta">
    <Typography
      type="caption"
      component="p"
    >
      {moment(props.date).format('dddd, MMMM Do YYYY')}
    </Typography>
  </div>
);

PostMeta.propTypes = {
  date: PropTypes.string.isRequired,
};

/*
<Tags
  tags={props.tags}
  tagStore={props.tagStore} />
*/

export default PostMeta;

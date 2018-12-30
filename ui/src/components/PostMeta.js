import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

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

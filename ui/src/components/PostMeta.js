import React from 'react';
import Typography from 'material-ui/Typography';
//import Tags from './Tags'
import moment from 'moment'
//import '../styles/components/PostMeta.css'

const PostMeta = (props) => (
  <div className={'post-meta'} >
    <Typography
      type='caption'
      component="p" >
      {moment(props.date).format('dddd, MMMM Do YYYY')}
    </Typography>
  </div>
)

/*
<Tags
  tags={props.tags}
  tagStore={props.tagStore} />
*/

export default PostMeta;

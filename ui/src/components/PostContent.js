import React from 'react';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PostMeta from './PostMeta';
// import '../styles/components/PostContent.css'

const PostContent = props => (
  <CardContent>
    <Typography
      type="headline"
      component="h2"
      dangerouslySetInnerHTML={{ __html: props.post.title.rendered }}
    />
    <Typography
      component="p"
      dangerouslySetInnerHTML={{ __html: props.post.content.rendered }}
    />
    <PostMeta
      date={props.post.date}
      tags={props.post.tags}
      tagStore={props.tags}
    />
  </CardContent>
);

export default PostContent;

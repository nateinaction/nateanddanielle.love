import React from 'react';
import Chip from '@material-ui/core/Chip';
import '../styles/components/Tags.css';

const Tags = props => (
  <div className="tags">
    {props.tags.map((tag, index) => {
      if (!props.tagStore[tag].fetching) {
        return <Chip key={index} label={props.tagStore[tag].name} className="tag" />;
      }
      return <div key={index} />;
    })}
  </div>
);

export default Tags;

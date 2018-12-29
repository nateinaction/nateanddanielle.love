import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import '../styles/components/Tags.css';

const Tags = props => (
  <div className="tags">
    {props.tags.map((tag) => {
      if (!props.tagStore[tag].fetching) {
        return <Chip key={tag} label={props.tagStore[tag].name} className="tag" />;
      }
      return <div key={tag} />;
    })}
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  tagStore: PropTypes.shape({
    fetching: PropTypes.bool,
  }).isRequired,
};

export default Tags;

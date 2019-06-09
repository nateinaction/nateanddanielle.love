import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Menu = props => (
  <div className="menu">
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Typography variant="h6" color="textPrimary" className="flex">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

Menu.propTypes = {
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: state.fromLocal.title,
  menu: state.fromLocal.menu,
});

const MenuContainer = connect(
  mapStateToProps,
)(Menu);

export default MenuContainer;

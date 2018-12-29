import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import openMenu from '../actions/openMenu';
import '../styles/containers/Menu.css';

const Menu = props => (
  <div className="menu">
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <IconButton color="primary" aria-label="Menu">
          <MenuIcon
            onClick={() => props.openMenu()}
          />
        </IconButton>
        <Typography type="title" color="default" className="flex">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      open={props.menu.open}
      onRequestClose={() => props.openMenu}
      onClick={() => props.openMenu()}
    >
      <List className="list" disablePadding>
        {props.menu.items.map(item => (
          <ListItem key={item.ID} href={item.url} button>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  </div>
);

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.shape({
    open: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  openMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  title: state.fromLocal.title,
  menu: state.fromLocal.menu,
});

const mapDispatchToProps = dispatch => ({
  openMenu: () => dispatch(openMenu()),
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

export default MenuContainer;

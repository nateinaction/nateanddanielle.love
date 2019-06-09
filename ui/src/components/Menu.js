import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import toggleMenu from '../actions/toggleMenu';
import './Menu.css';

const Menu = props => (
  <div className="menu">
    <AppBar position="static" style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton edge="end" color="primary" aria-label="Menu" onClick={() => props.toggleMenu()}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" color="textPrimary" className="flex">
          {props.title}
        </Typography>
        <Hidden smDown>
          {props.menu.items.map(menuItem => (
            <li className="nav-item" key={menuItem.ID} href={menuItem.url}>
              <Link href={menuItem.url}>{menuItem.title}</Link>
            </li>
          ))}
        </Hidden>
      </Toolbar>
    </AppBar>
    <Drawer open={props.menu.open} onClose={props.toggleMenu} onClick={() => props.toggleMenu()}>
      <List disablePadding>
        {props.menu.items.map(menuItem => (
          <ListItem key={menuItem.ID} href={menuItem.url} color="primary" button>
            <ListItemText primary={menuItem.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  </div>
);

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  menu: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  title: state.fromLocal.title,
  menu: state.fromLocal.menu,
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu()),
});

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);

export default MenuContainer;

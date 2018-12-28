import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List, { ListItem, ListItemText } from '@material-ui/core/List';
import openMenu from '../actions/openMenu';
import '../styles/containers/Menu.css';

class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <AppBar position="static" style={{ backgroundColor: 'white' }}>
          <Toolbar>
            <IconButton color="primary" aria-label="Menu">
              <MenuIcon
                onClick={() => this.props.openMenu()}
              />
            </IconButton>
            <Typography type="title" color="default" className="flex">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.props.menu.open}
          onRequestClose={() => this.props.openMenu}
          onClick={() => this.props.openMenu()}
        >
          <List className="list" disablePadding>
            {this.props.menu.items.map((item, index) => (
              <ListItem key={index} component="a" href={item.url} button>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

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

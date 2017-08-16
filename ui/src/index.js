/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
//import { red, purple } from 'material-ui/colors';
import store from './store'
//import Header from './containers/Header'
import Menu from './containers/Menu'
import Posts from './containers/Posts'
//import Test from './components/test'

//import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

import createPalette from 'material-ui/styles/palette';
import { blue, deepOrange, red } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: createPalette({
    primary: red,
    accent: {
      ...blue,
      A200: '#90CAF9',
    },
    error: deepOrange,
  }),
});

//const primary = red[500]; // #F44336
//const accent = purple['A200']; // #E040FB

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div>
        <Menu />
        <Posts />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
//registerServiceWorker();

/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles';
//import { red, purple } from 'material-ui/colors';
import store from './store'
//import Menu from './containers/Menu'
import Posts from './containers/Posts'
//import Test from './components/test'

//import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

//const primary = red[500]; // #F44336
//const accent = purple['A200']; // #E040FB

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Posts />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
//registerServiceWorker();

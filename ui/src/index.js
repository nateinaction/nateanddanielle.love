/* global document:true */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, deepOrange, red } from '@material-ui/core/colors';
import store from './store';
import Menu from './components/Menu';
import Posts from './components/Posts';

// import registerServiceWorker from './registerServiceWorker';
import './index.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: red,
    accent: {
      ...blue,
      A200: '#90CAF9',
    },
    error: deepOrange,
  },
});

// const primary = red[500]; // #F44336
// const accent = purple['A200']; // #E040FB

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div>
        <Menu />
        <Posts />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
// registerServiceWorker();

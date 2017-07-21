import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

const App = (props) => (
  <div className="App">
    <p>poke</p>
  </div>
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
//registerServiceWorker();

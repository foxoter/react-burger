import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './services/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename='/react-burger'>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

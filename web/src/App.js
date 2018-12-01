import React from 'react';
import { Router, Link } from 'react-static';
import { Provider } from 'react-redux';

import Routes from 'react-static-routes';
//
import store from './connectors/redux';

import './app.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <nav>
          <Link exact to="/">
            Home
          </Link>
          <Link exact to="/javascript">
            JavaScript
          </Link>
        </nav>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  </Provider>
);

export default App;

import React from 'react';
import { Router } from 'react-static';
import { Provider } from 'react-redux';

import Routes from 'react-static-routes';
//
import store from './createStore';

import Layout from './presentational/Layout';
import './app.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  </Provider>
);

export default App;

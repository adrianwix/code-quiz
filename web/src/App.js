import React from 'react';
import { Router } from 'react-static';
import { Provider } from 'react-redux';

import Routes from 'react-static-routes';
//
import store from 'store/createStore';

import Layout from 'presentational/Layout';
import 'styles/app.css';

// store.dispatch({ type: '@codequiz/@@INIT', payload: {} });

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

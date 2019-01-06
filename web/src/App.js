import React from 'react';
import { Routes } from 'react-static';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//
import store from 'store/createStore';

import Layout from 'presentational/Layout';
import 'styles/app.css';

store.dispatch({ type: '@codequiz/@@INIT', payload: {} });

let Router;
if (typeof Document === 'undefined') {
  Router = StaticRouter;
} else {
  Router = BrowserRouter;
}

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

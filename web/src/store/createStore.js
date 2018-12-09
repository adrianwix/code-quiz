import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from 'reducers';

const isProd = process.env.NODE === 'production';
const isClient = typeof window !== 'undefined';
const middlewareList = [];
const containsDevtool = isClient && window.__REDUX_DEVTOOLS_EXTENSION__;
let devTool = f => f;

if (!isProd && isClient) {
  middlewareList.push(createLogger());
}

if (!isProd && containsDevtool) {
  devTool = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const middleware = compose(
  applyMiddleware(...middlewareList),
  devTool,
);

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  {}, // initial state
  middleware,
);
/* eslint-enable */

export default store;

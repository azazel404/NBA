import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/redux';
import Root from './src/';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createWithStore = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware))
);

export default function App() {
  return (
    <Provider store={createWithStore}>
      <Root />
    </Provider>
  );
}

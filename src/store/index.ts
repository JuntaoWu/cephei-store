import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer } from '../reducers'

const epicMiddleware = createEpicMiddleware();

const middlewares = [
  epicMiddleware
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store;
}

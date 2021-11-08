import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleWare } from './middlewares';
import { API_WS_ALL } from './constants/apiConfig';
import { wsActions } from './actions/ws-actions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleWare(API_WS_ALL, wsActions)));

export const store = createStore(rootReducer, enhancer);
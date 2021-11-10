import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleWare } from './middlewares';
import { API_WS_ALL, API_WS_AUTH } from './constants/api-config';
import { wsActions } from './actions/ws-actions';
import { wsAuthActions } from './actions/ws-auth-actions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleWare(API_WS_ALL, wsActions), socketMiddleWare(API_WS_AUTH, wsAuthActions, true)));

export const store = createStore(rootReducer, enhancer);
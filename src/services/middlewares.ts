import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../helpers/tokens-helper';
import { TAppActions } from './types';
import { TWsActionTypes } from './actions/ws-actions';

export const socketMiddleWare = (wsUrl: string, wsActions: TWsActionTypes, authorized?: boolean): Middleware => (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next: (i: TAppActions) => void) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onError, onMessage, onClose, wsSendMessage, wsStop } = wsActions;
      const token = authorized ? getCookie('token') : null;

      if (type === wsInit) {
        socket = token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onclose = () => {
          dispatch({ type: onClose });
        };
        if (socket && type === wsSendMessage) {
          const { message } = payload;
          socket.send(JSON.stringify(message));
        }
        if (socket && type === wsStop) {
          socket.close(1000, 'socket closed');
        }
      }
      next(action);
    }

}
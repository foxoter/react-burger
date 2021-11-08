import type { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { AppDispatch, RootState } from './types';

export const socketMiddleWare = (wsUrl: string, wsActions: any): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onError, onMessage, onClose } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
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
        // if (type === wsSendMessage) {
        //   const message = payload;
        //   message.token = user.token;
        //   socket.send(JSON.stringify(message));
        // }
      }
      next(action);
    }
  }
}
import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../helpers/tokens-helper';
import { TAppActions } from './types';

type TWsAction = {
  wsInit: string
  onOpen: string
  onError: string
  onMessage: string
  onClose: string
}

export const socketMiddleWare = (wsUrl: string, wsActions: TWsAction, authorized?: boolean): Middleware => (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next: (i: TAppActions) => void) => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onError, onMessage, onClose } = wsActions;
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
        // if (type === wsSendMessage) {
        //   const message = payload;
        //   // message.token = user.token;
        //   socket.send(JSON.stringify(message));
        // }
      }
      next(action);
    }

}
import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_STOP,
} from '../constants/ws-actions';
import { TOrdersInfo } from '../types/t-order-data';
import { TWsActions } from '../actions/ws-actions';

type TWsFeedInitialState = {
  wsConnected: boolean
  error?: { message: string } | null
  ordersInfo: TOrdersInfo | null
}

const initialState: TWsFeedInitialState = {
  wsConnected: false,
  error: null,
  ordersInfo: null
}

export const wsReducer = (state = initialState, action: TWsActions) => {
  switch (action.type) {
    case WS_CONNECTION_STOP:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      }
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        ordersInfo: action.payload,
      }
    default:
      return state;
  }
}
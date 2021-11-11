import { PayloadAction } from '@reduxjs/toolkit';
import {
  WS_CONNECTION_STOP_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_GET_MESSAGE_AUTH,
} from '../constants/ws-auth-actions';
import { TOrdersInfo } from '../types/t-order-data';
import { TWsAuthActions } from '../actions/ws-auth-actions';

type TWsAuthFeedInitialState = {
  wsConnected: boolean
  error?: PayloadAction | null
  ordersInfo: TOrdersInfo | null
}

const initialState: TWsAuthFeedInitialState = {
  wsConnected: false,
  error: null,
  ordersInfo: null
}

export const wsAuthReducer = (state = initialState, action: TWsAuthActions) => {
  switch (action.type) {
    case WS_CONNECTION_STOP_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      }
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        ordersInfo: action.payload,
      }
    default:
      return state;
  }
}


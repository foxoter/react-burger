import {
  WS_CONNECTION_STOP_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_GET_MESSAGE_AUTH,
} from '../constants/ws-auth-actions';
import { wsAuthReducer } from "./ws-auth-reducer";
import { mockOrdersInfoObject } from "./ws-reducer.test";

const initialState = {
  wsConnected: false,
  error: null,
  ordersInfo: null
}

const wsConnectionSuccessState = {
  wsConnected: true,
  error: undefined,
  ordersInfo: null
}

const wsConnectionStopState = {
  wsConnected: false,
  error: undefined,
  ordersInfo: null
}

const wsConnectionErrorState = {
  wsConnected: false,
  error: { message: "Error" },
  ordersInfo: null
}

const wsGetMessageState = {
  wsConnected: true,
  error: undefined,
  ordersInfo: mockOrdersInfoObject
}

describe('websocket auth connection reducer', () => {
  it('should return initial state', () => {
    expect(wsAuthReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsAuthReducer(initialState, { type: WS_CONNECTION_SUCCESS_AUTH }))
      .toEqual(wsConnectionSuccessState);
  });

  it('should handle WS_CONNECTION_STOP', () => {
    expect(wsAuthReducer(wsConnectionSuccessState, { type: WS_CONNECTION_STOP_AUTH }))
      .toEqual(wsConnectionStopState);
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsAuthReducer(wsConnectionSuccessState, { type: WS_CONNECTION_ERROR_AUTH, payload: { message: "Error" } }))
      .toEqual(wsConnectionErrorState);
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsAuthReducer(wsConnectionSuccessState, { type: WS_CONNECTION_CLOSED_AUTH }))
      .toEqual(wsConnectionStopState);
  });

  it('should handle WS_GET_MESSAGE', () => {
    expect(wsAuthReducer(wsConnectionSuccessState, { type: WS_GET_MESSAGE_AUTH, payload: mockOrdersInfoObject }))
      .toEqual(wsGetMessageState);
  });
})
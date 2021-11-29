import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_STOP,
} from '../constants/ws-actions';
import { wsReducer } from "./ws-reducer";

const mockOrdersInfoObject = {
  success: true,
  orders: [
    {
      _id: "61a502da19cb95001bc36fcb",
      ingredients: [
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c6"
      ],
      status: "done",
      name: "Люминесцентный краторный бургер",
      createdAt: "2021-11-29T16:42:02.269Z",
      updatedAt: "2021-11-29T16:42:02.891Z",
      number: 6410
    },
    {
      _id: "61a502da19cb95001bc36fcb",
      ingredients: [
        "60d3b41abdacab0026a733c8",
        "60d3b41abdacab0026a733c6"
      ],
      status: "done",
      name: "Люминесцентный краторный бургер",
      createdAt: "2021-11-29T16:42:02.269Z",
      updatedAt: "2021-11-29T16:42:02.891Z",
      number: 6410
    },
  ],
  total: 6323,
  totalToday: 65
}

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
  error: 'Error',
  ordersInfo: null
}

const wsGetMessageState = {
  wsConnected: true,
  error: undefined,
  ordersInfo: mockOrdersInfoObject
}

describe('websocket connection reducer', () => {
  it('should return initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS }))
      .toEqual(wsConnectionSuccessState);
  });

  it('should handle WS_CONNECTION_STOP', () => {
    expect(wsReducer(wsConnectionSuccessState, { type: WS_CONNECTION_STOP }))
      .toEqual(wsConnectionStopState);
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer(wsConnectionSuccessState, { type: WS_CONNECTION_ERROR, payload: 'Error' }))
      .toEqual(wsConnectionErrorState);
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer(wsConnectionSuccessState, { type: WS_CONNECTION_CLOSED }))
      .toEqual(wsConnectionStopState);
  });

  it('should handle WS_GET_MESSAGE', () => {
    expect(wsReducer(wsConnectionSuccessState, { type: WS_GET_MESSAGE, payload: mockOrdersInfoObject }))
      .toEqual(wsGetMessageState);
  });
})
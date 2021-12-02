import {
  DELETE_ORDER_ID,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS
} from '../constants/order';
import { orderReducer } from "./order-reducer";

const mockOrderId = 666;

const orderInitialState = {
  currentOrderRequest: false,
  currentOrderFailed: false,
  currentOrderId: null
}

const placeOrderRequestState = {
  currentOrderRequest: true,
  currentOrderFailed: false,
  currentOrderId: null
}

const placeOrderFailedState = {
  currentOrderRequest: false,
  currentOrderFailed: true,
  currentOrderId: null
}

const placeOrderSuccessState = {
  currentOrderRequest: false,
  currentOrderFailed: false,
  currentOrderId: mockOrderId
}

describe('order reducer', () => {
  it('should return initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(orderInitialState);
  });

  it('should handle PLACE_ORDER_REQUEST', () => {
    expect(orderReducer(orderInitialState, { type: PLACE_ORDER_REQUEST }))
      .toEqual(placeOrderRequestState);
  });

  it('should handle PLACE_ORDER_FAILED', () => {
    expect(orderReducer(orderInitialState, { type: PLACE_ORDER_FAILED }))
      .toEqual(placeOrderFailedState);
  });

  it('should handle PLACE_ORDER_SUCCESS', () => {
    expect(orderReducer(orderInitialState, { type: PLACE_ORDER_SUCCESS, id: mockOrderId }))
      .toEqual(placeOrderSuccessState);
  });

  it('should handle DELETE_ORDER_ID', () => {
    expect(orderReducer(placeOrderSuccessState, { type: DELETE_ORDER_ID }))
      .toEqual(orderInitialState);
  });
});
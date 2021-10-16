import { TOrderActions } from '../actions/order';

import {
  DELETE_ORDER_ID,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS
} from '../constants/order';

type TOrderInitialState = {
  currentOrderRequest: boolean;
  currentOrderFailed: boolean;
  currentOrderId: string | null;
}

const orderInitialState: TOrderInitialState = {
  currentOrderRequest: false,
  currentOrderFailed: false,
  currentOrderId: null
}

export const orderReducer = (state = orderInitialState, action: TOrderActions) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        currentOrderRequest: true
      }
    }
    case PLACE_ORDER_FAILED: {
      return {
        ...state,
        currentOrderRequest: false,
        currentOrderId: null,
        currentOrderFailed: true
      }
    }
    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        currentOrderRequest: false,
        currentOrderFailed: false,
        currentOrderId: action.id
      }
    }
    case DELETE_ORDER_ID: {
      return {
        ...state,
        currentOrderId: null
      }
    }
    default: {
      return state;
    }
  }
}
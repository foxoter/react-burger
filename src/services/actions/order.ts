import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  DELETE_ORDER_ID
} from '../constants/order';
import { OrderDataTypes } from '../types/order-data-types';
import { sendOrderData } from '../../helpers/api';

export interface IPlaceOrderRequestAction {
  readonly type: typeof PLACE_ORDER_REQUEST;
}

export interface IPlaceOrderSuccessAction {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  readonly id: number;
}

export interface IPlaceOrderFailedAction {
  readonly type: typeof PLACE_ORDER_FAILED;
}

export interface IDeleteOrderIdAction {
  readonly type: typeof DELETE_ORDER_ID;
}

export type TOrderActions = IPlaceOrderRequestAction
  | IPlaceOrderSuccessAction
  | IPlaceOrderFailedAction
  | IDeleteOrderIdAction

export const placeOrderRequestAction = (): IPlaceOrderRequestAction => ({
  type: PLACE_ORDER_REQUEST,
});

export const placeOrderSuccessAction = (id: number): IPlaceOrderSuccessAction => ({
  type: PLACE_ORDER_SUCCESS,
  id,
});

export const placeOrderFailedAction = (): IPlaceOrderFailedAction => ({
  type: PLACE_ORDER_FAILED,
});

export const deleteOrderIdAction = (): IDeleteOrderIdAction => ({
  type: DELETE_ORDER_ID,
});

export function placeOrder(order: OrderDataTypes) {
  return function (dispatch: any) {
    dispatch(placeOrderRequestAction());
    sendOrderData(order)
      .then(res => {
        dispatch(placeOrderSuccessAction(res.order.number))
      })
      .catch(() => {
        dispatch(placeOrderFailedAction());
      })
  }
}
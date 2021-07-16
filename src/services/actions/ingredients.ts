import { getProductsData, sendOrderData } from '../../helpers/api';
import { OrderDataTypes } from '../../types/order-data-types';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';

export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

export function getIngredients() {
  return function(dispatch: any) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getProductsData()
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
        })
      })
      .catch(() => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      })
  }
}

export function placeOrder(order: OrderDataTypes) {
  return function (dispatch: any) {
    dispatch({ type: PLACE_ORDER_REQUEST });
    sendOrderData(order)
      .then(res => {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          id: res.order.number,
        })
      })
      .catch(() => {
        dispatch({ type: PLACE_ORDER_FAILED })
      })
  }
}
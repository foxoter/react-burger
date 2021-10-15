import { getProductsData, sendOrderData } from '../../helpers/api';
import { OrderDataTypes } from '../types/order-data-types';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  DELETE_ORDER_ID,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REWRITE_INGREDIENTS
} from '../constants/ingredients';
import TBurgersDataTypes from '../types/t-burgers-data-types';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: TBurgersDataTypes[];
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IAddCurrentIngredientAction {
  readonly type: typeof ADD_CURRENT_INGREDIENT;
  readonly ingredient: TBurgersDataTypes;
}

export interface IDeleteCurrentIngredientAction {
  readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

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

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TBurgersDataTypes;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
}

export interface IRewriteIngredientsAction {
  readonly type: typeof REWRITE_INGREDIENTS;
  readonly payload: TBurgersDataTypes[];
}

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccessAction = (data: TBurgersDataTypes[]): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  data,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const addCurrentIngredientAction = (ingredient: TBurgersDataTypes): IAddCurrentIngredientAction => ({
  type: ADD_CURRENT_INGREDIENT,
  ingredient,
});

export const deleteCurrentIngredientAction = (): IDeleteCurrentIngredientAction => ({
  type: DELETE_CURRENT_INGREDIENT
});

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

export const addIngredientAction = (payload: TBurgersDataTypes): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload,
});

export const deleteIngredientAction = (payload: string): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  payload,
});

export const rewriteIngredientsAction = (payload: TBurgersDataTypes[]): IRewriteIngredientsAction => ({
  type: REWRITE_INGREDIENTS,
  payload,
});

export type TIngredientsActions =
  IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddCurrentIngredientAction
  | IDeleteCurrentIngredientAction
  | IPlaceOrderRequestAction
  | IPlaceOrderSuccessAction
  | IPlaceOrderFailedAction
  | IDeleteOrderIdAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IRewriteIngredientsAction

export function getIngredients() {
  return function(dispatch: any) {
    dispatch(getIngredientsRequestAction());
    getProductsData()
      .then(res => {
        dispatch(getIngredientsSuccessAction(res.data))
      })
      .catch(() => {
        dispatch(getIngredientsFailedAction());
      })
  }
}

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
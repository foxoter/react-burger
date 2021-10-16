import { getProductsData } from '../../helpers/api';
import { AppDispatch, AppThunk } from '../types';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
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

export type TIngredientsActions =
  IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IAddCurrentIngredientAction
  | IDeleteCurrentIngredientAction

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


export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
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


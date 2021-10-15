import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REWRITE_INGREDIENTS,
} from '../constants/burger';
import TBurgersDataTypes from '../types/t-burgers-data-types';

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

export type TBurgerActions =
  IAddIngredientAction
  | IDeleteIngredientAction
  | IRewriteIngredientsAction

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
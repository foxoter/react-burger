import TBurgersDataTypes from '../types/t-burgers-data-types';
import { TIngredientsActions } from '../actions/ingredients';

import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
} from '../constants/ingredients';

type TIngredientsState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsList: TBurgersDataTypes[],
  currentIngredient: TBurgersDataTypes | null;
}

const ingredientsState: TIngredientsState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: [],
  currentIngredient: null,
}

export const ingredientsReducer = (state = ingredientsState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsList: action.data
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    }
    case ADD_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.ingredient,
      }
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null
      }
    }
    default: {
      return state;
    }
  }
}
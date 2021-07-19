import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  DELETE_ORDER_ID,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REWRITE_INGREDIENTS
} from '../actions/ingredients';

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: [],

  constructorItems: [],
  currentIngredient: null,

  currentOrder: [],

  currentOrderRequest: false,
  currentOrderFailed: false,
  currentOrderId: null
}

export const ingredientsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredientsRequest: true
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
        currentIngredient: action.ingredient
      }
    }
    case DELETE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: null
      }
    }
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
    case ADD_INGREDIENT: {
      const uuid = String(action.payload._id + Math.random());
      action.payload.uuid = uuid;
      if (action.payload.type === 'bun') {
        const filteredItems = state.constructorItems.filter(({ type }) => type !== 'bun');
        return {
          ...state,
          constructorItems: [...filteredItems, action.payload]
        }
      }
      return {
        ...state,
        constructorItems: [...state.constructorItems, action.payload]
      }
    }
    case DELETE_INGREDIENT: {
      const newItems = state.constructorItems;
      newItems.splice(newItems.findIndex(({ _id }) => _id === action.payload), 1);
      return {
        ...state,
        constructorItems: [...newItems]
      }
    }
    case REWRITE_INGREDIENTS: {
      return {
        ...state,
        constructorItems: [...action.payload]
      }
    }
    default: {
      return state;
    }
  }
}
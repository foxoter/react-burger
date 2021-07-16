import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS
} from '../actions/ingredients';

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: [],

  constructorItems: [
    {
      "_id": "60d3b41abdacab0026a733c6",
      "name": "Краторная булка N-200i",
      "type": "bun",
      "proteins": 80,
      "fat": 24,
      "carbohydrates": 53,
      "calories": 420,
      "price": 1255,
      "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v": 0
    },
    {
      "_id": "60d3b41abdacab0026a733c8",
      "name": "Говяжий метеорит (отбивная)",
      "type": "main",
      "proteins": 800,
      "fat": 800,
      "carbohydrates": 300,
      "calories": 2674,
      "price": 3000,
      "image": "https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
      "__v": 0
    },
  ],
  currentIngredient: null,

  currentOrder: [],

  currentOrderRequest: false,
  currentOrderFailed: false,
  currentOrderId: null
}

const ingredientsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
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
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});
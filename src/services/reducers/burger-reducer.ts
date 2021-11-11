import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REWRITE_INGREDIENTS,
} from '../constants/burger';
import TBurgersDataTypes from '../types/t-burgers-data-types';
import { TBurgerActions } from '../actions/burger';

type TBurgerConstructorInitialState = {
  constructorItems: TBurgersDataTypes[];
}

const burgerConstructorInitialState: TBurgerConstructorInitialState = {
  constructorItems: [],
}

export const constructorReducer = (state = burgerConstructorInitialState, action: TBurgerActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      action.payload.uuid = String(action.payload._id + Math.random());
      if (action.payload.type === 'bun') {
        const filteredItems = state.constructorItems.filter(({ type }) => type !== 'bun');
        return {
          ...state,
          constructorItems: [...filteredItems, action.payload, action.payload],
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
import { combineReducers } from 'redux';

import { ingredientsReducer, orderReducer, constructorReducer } from './reducers';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: constructorReducer
});
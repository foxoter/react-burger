import { combineReducers } from 'redux';

import { ingredientsReducer, orderReducer, constructorReducer } from './ingredients-reducers';

import { userReducer } from './user-reducers';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: constructorReducer,
  user: userReducer,
});
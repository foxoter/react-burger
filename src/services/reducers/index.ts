import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients-reducers';
import { orderReducer } from './order-reducer';
import { constructorReducer } from './burger-reducer';

import { userReducer } from './user-reducers';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: constructorReducer,
  user: userReducer,
});
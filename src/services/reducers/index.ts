import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients-reducer';
import { orderReducer } from './order-reducer';
import { constructorReducer } from './burger-reducer';

import { userReducer } from './user-reducers';
import { wsReducer } from './ws-reducer';
import { wsAuthReducer } from './ws-auth-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burger: constructorReducer,
  user: userReducer,
  wsFeed: wsReducer,
  wsAuthFeed: wsAuthReducer,
});
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TBurgerActions } from '../actions/burger';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TUserActions } from '../actions/user';
import { store } from '../store';

export type TAppActions = TBurgerActions | TIngredientsActions | TOrderActions | TUserActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TAppActions>
  >;
import { TBurgerActions } from './burger';
import { TIngredientsActions } from './ingredients';
import { TOrderActions } from './order';
import { TUserActions } from './user';

export type TAppActions = TBurgerActions | TIngredientsActions | TOrderActions | TUserActions;
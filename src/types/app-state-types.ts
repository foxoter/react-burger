import BurgersDataTypes from './burgers-data-types';
import { UserDataTypes } from './user-data-types';

type AppStateTypes = {
  ingredients: {
    ingredientsRequest: boolean
    ingredientsFailed: boolean
    ingredientsList: BurgersDataTypes[]

    constructorItems: BurgersDataTypes[]
    currentIngredient: BurgersDataTypes
  },
  order: {
    currentOrder: string[]
    currentOrderId: string
  },
  burger: {
    constructorItems: BurgersDataTypes[]
  },
  user: {
    currentUser: null | UserDataTypes
    userRegisterRequest: boolean
    userRegisterFailed: boolean
    userLoginRequest: boolean
    userLoginFailed: boolean
    userLogoutRequest: boolean
    userLogoutFailed: boolean
    resetPasswordRequest: boolean
    resetPasswordSuccess: boolean
    resetPasswordFailed: boolean
    updatePasswordRequest: boolean
    updatePasswordSuccess: boolean
    updatePasswordFailed: boolean
  }
}

export default AppStateTypes;
import TBurgersDataTypes from './t-burgers-data-types';
import { UserDataTypes } from './user-data-types';

type AppStateTypes = {
  ingredients: {
    ingredientsRequest: boolean
    ingredientsFailed: boolean
    ingredientsList: TBurgersDataTypes[]

    constructorItems: TBurgersDataTypes[]
    currentIngredient: TBurgersDataTypes
  },
  order: {
    currentOrder: string[]
    currentOrderId: string
  },
  burger: {
    constructorItems: TBurgersDataTypes[]
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
    updateProfileRequest: boolean
    updateProfileSuccess: boolean
    updateProfileFailed: boolean
  }
}

export default AppStateTypes;
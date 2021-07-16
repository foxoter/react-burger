import BurgersDataTypes from './burgers-data-types';

type AppState = {
  ingredients: {
    ingredientsRequest: boolean
    ingredientsFailed: boolean
    ingredientsList: BurgersDataTypes[]

    constructorItems: BurgersDataTypes[]
    currentIngredient: BurgersDataTypes
    currentOrder: string[]
    currentOrderId: string
  }
}

export default AppState;
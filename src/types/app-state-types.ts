import BurgersDataTypes from './burgers-data-types';

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
  }
}

export default AppStateTypes;
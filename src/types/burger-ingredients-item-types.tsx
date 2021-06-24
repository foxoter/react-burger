import BurgersDataTypes from './burgers-data-types';

type BurgerIngredientsItemTypes = {
  data: BurgersDataTypes
  onPurchase: (item: BurgersDataTypes) => void
}

export default BurgerIngredientsItemTypes;
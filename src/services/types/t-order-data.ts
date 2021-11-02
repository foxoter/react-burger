import TBurgersDataTypes from './t-burgers-data-types';

export interface TOrderData {
  status: string
  name: string
  createdAt: string
  updatedAt: string
  number: number
  _id: string
  ingredients: string[]
}

export type TOrderRenderData = TOrderData & {
  images: string[]
  price: number
  fullIngredients: TBurgersDataTypes[]
}
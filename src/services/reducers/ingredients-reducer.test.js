import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT,
} from "../constants/ingredients";
import { ingredientsReducer } from "./ingredients-reducers";

const mockIngredient = {
  _id: "60d3b41abdacab0026a733cd",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  __v: 0,
  uuid: "60d3b41abdacab0026a733cd0.09945591567361456",
}

const mockIngredientsData = [
  {
    _id: "60d3b41abdacab0026a733cd",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
    uuid: "60d3b41abdacab0026a733cd0.09945591567361456",
  },
  {
    _id: '60d3b41abdacab0026a733d2',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
    __v: 0,
    uuid: '60d3b41abdacab0026a733d20.5097014300560314'
  }
]

const ingredientsInitialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: [],
  currentIngredient: null,
}

const ingredientsRequestState = {
  ingredientsRequest: true,
  ingredientsFailed: false,
  ingredientsList: [],
  currentIngredient: null,
}

const ingredientsSuccessState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: mockIngredientsData,
  currentIngredient: null,
}

const ingredientsFailedState = {
  ingredientsRequest: false,
  ingredientsFailed: true,
  ingredientsList: [],
  currentIngredient: null,
}

const addIngredientState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientsList: [],
  currentIngredient: mockIngredient,
}

describe('burger ingredients reducer', () => {
  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(ingredientsInitialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(ingredientsInitialState, { type: GET_INGREDIENTS_REQUEST }))
      .toEqual(ingredientsRequestState)
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(
      ingredientsInitialState,
      { type: GET_INGREDIENTS_SUCCESS, data: mockIngredientsData })
    )
      .toEqual(ingredientsSuccessState);
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(ingredientsInitialState, { type: GET_INGREDIENTS_FAILED }))
      .toEqual(ingredientsFailedState);
  });

  it('should handle ADD_CURRENT_INGREDIENT', () => {
    expect(ingredientsReducer(ingredientsInitialState, { type: ADD_CURRENT_INGREDIENT, ingredient: mockIngredient }))
      .toEqual(addIngredientState);
  });

  it('should handle DELETE_CURRENT_INGREDIENT', () => {
    expect(ingredientsReducer(addIngredientState, { type: DELETE_CURRENT_INGREDIENT }))
      .toEqual(ingredientsInitialState);
  });
});

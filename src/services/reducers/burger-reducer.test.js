import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REWRITE_INGREDIENTS,
} from '../constants/burger';
import { constructorReducer } from "./burger-reducer";

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

const mockIngredient2 = {
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

const mockBunIngredient = {
  _id: "60d3b41abdacab0026a733c7",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
  uuid: "60d3b41abdacab0026a733c70.21754545086208044"
}

const burgerConstructorInitialState = {
  constructorItems: [],
}

describe('burger constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {})).toEqual(burgerConstructorInitialState);
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(constructorReducer(burgerConstructorInitialState,
      {
        type: ADD_INGREDIENT,
        payload: mockBunIngredient,
      })).toEqual({ constructorItems: [mockBunIngredient, mockBunIngredient] });

    expect(constructorReducer(burgerConstructorInitialState,
      {
        type: ADD_INGREDIENT,
        payload: mockIngredient,
      })).toEqual({ constructorItems: [mockIngredient] });

    expect(constructorReducer({ constructorItems: [mockIngredient] },
      {
        type: ADD_INGREDIENT,
        payload: mockIngredient,
      })).toEqual({ constructorItems: [mockIngredient, mockIngredient] });
  });

  it('should handle DELETE_INGREDIENT', () => {
    expect(constructorReducer(
      { constructorItems: [mockIngredient, mockBunIngredient] },
      { type: DELETE_INGREDIENT, payload: '60d3b41abdacab0026a733cd' }))
      .toEqual({ constructorItems: [mockBunIngredient] });

    expect(constructorReducer(
      { constructorItems: [mockIngredient, mockIngredient] },
      { type: DELETE_INGREDIENT, payload: '60d3b41abdacab0026a733cd' }))
      .toEqual({ constructorItems: [mockIngredient] });
  });

  it('should handle REWRITE_INGREDIENTS', () => {
    expect(constructorReducer(
      { constructorItems: [mockBunIngredient, mockIngredient2, mockIngredient] },
      { type: REWRITE_INGREDIENTS, payload: [mockBunIngredient, mockIngredient, mockIngredient2] }))
      .toEqual({ constructorItems: [mockBunIngredient, mockIngredient, mockIngredient2] });
  });
});


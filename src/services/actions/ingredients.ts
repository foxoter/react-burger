import { getProductsData } from '../../helpers/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function(dispatch: any) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    getProductsData()
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
        })
      })
      .catch(() => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      })
  }
}
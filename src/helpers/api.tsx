import { API_URL } from '../constants/apiConfig';

const getProductsData = async () => {
  const response = await fetch(API_URL);
  const data = response.ok ? await response.json() : Promise.reject(response);
  return data;
}

export {
  getProductsData
}
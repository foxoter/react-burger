import { API_URL } from '../constants/apiConfig';
import { OrderDataTypes } from '../types/order-data-types';

const getProductsData = async () => {
  const response = await fetch(`${API_URL}/ingredients`);
  const data = response.ok ? await response.json() : Promise.reject(response);
  return data;
}

const sendOrderData = async (order: OrderDataTypes) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(order)
  });
  const data = response.ok ? await response.json() : Promise.reject(response);
  return data;
}

export {
  getProductsData,
  sendOrderData,
}
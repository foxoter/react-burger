import { API_URL } from '../constants/apiConfig';
import { OrderDataTypes } from '../types/order-data-types';
import { resetPasswordTypes } from '../types/reset-password-types';

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

const resetPasswordRequest = async (data: resetPasswordTypes) => {
  console.log('api method', data)
  const response = await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    console.log(await response.json())
  } else {
    Promise.reject(response)
  }
}

const confirmPasswordReset = async (data: resetPasswordTypes) => {
  console.log('api method', data)
  const response = await fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    console.log(await response.json())
  } else {
    console.log(await response.json())
    Promise.reject(response)
  }
}

export {
  getProductsData,
  sendOrderData,
  resetPasswordRequest,
  confirmPasswordReset
}
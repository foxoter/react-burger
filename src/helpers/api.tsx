import { API_URL } from '../constants/apiConfig';
import { OrderDataTypes } from '../types/order-data-types';
import { ResetPasswordTypes } from '../types/reset-password-types';
import { UserDataTypes } from '../types/user-data-types';

const getProductsData = async () => {
  const response = await fetch(`${API_URL}/ingredients`);
  const data = response.ok ? await response.json() : await Promise.reject(response);
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
  const data = response.ok ? await response.json() : await Promise.reject(response);
  return data;
}

const resetPasswordRequest = async (data: ResetPasswordTypes) => {
  const response = await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    console.log(await response.json());
  } else {
    await Promise.reject(response);
  }
}

const confirmPasswordReset = async (data: ResetPasswordTypes) => {
  const response = await fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    console.log(await response.json());
  } else {
    console.log(await response.json());
    await Promise.reject(response);
  }
}

const sendNewUserData = async (data: UserDataTypes) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  const res = response.ok ? await response.json() : await Promise.reject(response);
  return res;
}

const sendAuthData = async (data: UserDataTypes) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  const res = response.ok ? await response.json() : await Promise.reject(response);
  return res;
}

export {
  getProductsData,
  sendOrderData,
  resetPasswordRequest,
  confirmPasswordReset,
  sendNewUserData,
  sendAuthData
}
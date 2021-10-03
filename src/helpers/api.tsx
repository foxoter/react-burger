import { API_URL } from '../constants/apiConfig';
import { OrderDataTypes } from '../types/order-data-types';
import { ResetPasswordTypes } from '../types/reset-password-types';
import { UserDataTypes } from '../types/user-data-types';
import { getCookie, getRefreshToken } from './tokens-helper';

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
  // remove later
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
  // remove later
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
  return response.ok ? await response.json() : await Promise.reject(response);
}

const sendAuthData = async (data: UserDataTypes) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  return response.ok ? await response.json() : await Promise.reject(response);
}

const getUserData = async () => {
  const response = await fetch(`${API_URL}/auth/user`, {
    headers: {
      Authorization: 'Bearer ' + getCookie('token'),
    }
  });
  return response.ok ? await response.json() : await Promise.reject(response);
}

const clearUserData = async () => {
  const body = { token: getRefreshToken() };
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  });
  return response.ok ? await response.json() : await Promise.reject(response);
}

export {
  getProductsData,
  sendOrderData,
  resetPasswordRequest,
  confirmPasswordReset,
  sendNewUserData,
  sendAuthData,
  getUserData,
  clearUserData
}
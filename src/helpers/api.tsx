import { API_URL } from '../constants/apiConfig';
import { OrderDataTypes } from '../types/order-data-types';
import { ResetPasswordTypes } from '../types/reset-password-types';
import { UserDataTypes } from '../types/user-data-types';
import { getCookie, getRefreshToken } from './tokens-helper';

const getProductsData = async () => {
  const response = await fetch(`${API_URL}/ingredients`);
  return response.ok ? await response.json() : await Promise.reject(response);
}

const sendOrderData = async (order: OrderDataTypes) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(order)
  });
  return response.ok ? await response.json() : await Promise.reject(response);
}

const resetPasswordRequest = async (data: ResetPasswordTypes) => {
  const response = await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  return response.ok ? await response.json() : await Promise.reject(response);
}

const confirmPasswordReset = async (data: ResetPasswordTypes) => {
  const response = await fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
  return response.ok ? await response.json() : await Promise.reject(response);
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

const patchUserData = async (data: UserDataTypes) => {
  const response = await fetch(`${API_URL}/auth/user`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Authorization: 'Bearer ' + getCookie('token'),
    }
  });
  return response.ok ? await response.json() : await Promise.reject(response);
}

const refreshToken = async (token: string | null) => {
  const body = { token: token };
  const response = await fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
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
  patchUserData,
  clearUserData,
  refreshToken
}
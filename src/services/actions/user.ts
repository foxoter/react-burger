import { UserDataTypes } from '../types/user-data-types';

import {
  sendNewUserData,
  sendAuthData,
  getUserData,
  clearUserData,
  refreshToken,
  resetPasswordRequest,
  confirmPasswordReset, patchUserData
} from '../../helpers/api';
import { assignTokens, clearTokens, getRefreshToken } from '../../helpers/tokens-helper';
import { ResetPasswordTypes } from '../types/reset-password-types';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST' as const;
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'as const;
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED'as const;

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'as const;
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'as const;
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'as const;

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST'as const;
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'as const;
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED'as const;

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'as const;
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'as const;
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'as const;
export const RESET_PASSWORD_CLEAR = 'RESET_PASSWORD_CLEAR'as const;

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST'as const;
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS'as const;
export const UPDATE_PASSWORD_FAILED = 'UPDATE_PASSWORD_FAILED'as const;
export const UPDATE_PASSWORD_CLEAR = 'UPDATE_PASSWORD_CLEAR'as const;

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'as const;
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'as const;
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'as const;

export function handleResetPasswordRequest(data: ResetPasswordTypes) {
  return function (dispatch: any) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPasswordRequest(data)
      .then(res => {
        console.log('reset password request res: ', res);
        dispatch({ type: RESET_PASSWORD_SUCCESS });
      })
      .catch(err => {
        console.log('reset password request err: ', err);
        dispatch({ type: RESET_PASSWORD_FAILED });
      })
      .finally(() => {
        console.log('reset pass finally...');
        dispatch({ type: RESET_PASSWORD_CLEAR })
      });
  }
}

export function handlePasswordUpdate(data: ResetPasswordTypes) {
  return function (dispatch: any) {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    confirmPasswordReset(data)
      .then(res => {
        console.log('confirm password reset res: ', res);
        dispatch({ type: UPDATE_PASSWORD_SUCCESS });
      })
      .catch(err => {
        console.log('confirm password reset err: ', err);
        dispatch({ type: UPDATE_PASSWORD_FAILED });
      })
      .finally(() => {
        console.log('update pass finally...');
        dispatch({ type: UPDATE_PASSWORD_CLEAR })
      });
  }
}

export function registerUser(data: UserDataTypes) {
  return function (dispatch: any) {
    dispatch({ type: REGISTER_USER_REQUEST });
    sendNewUserData(data)
      .then(res => {
        console.log('user register res: ', res);
        const { user, accessToken, refreshToken } = res;
        dispatch({ type: REGISTER_USER_SUCCESS, user: user });
        assignTokens(accessToken, refreshToken);
      })
      .catch(err => {
        console.log('user register res: ', err);
        dispatch({ type: REGISTER_USER_FAILED});
      })
  }
}

export function authUser(data: UserDataTypes) {
  return function (dispatch: any) {
    dispatch({ type: LOGIN_USER_REQUEST });
    sendAuthData(data)
      .then(res => {
        console.log('user auth res: ', res);
        const { user, accessToken, refreshToken } = res;
        dispatch({ type: LOGIN_USER_SUCCESS, user: user });
        assignTokens(accessToken, refreshToken);
      })
      .catch(err => {
        console.log('user auth res: ', err);
        dispatch({ type: LOGIN_USER_FAILED });
      })
  }
}

export function checkAuth() {
  return function (dispatch: any) {
    dispatch({ type: LOGIN_USER_REQUEST });
    getUserData()
      .then(res => {
        console.log('check user method res:', res);
        dispatch({ type: LOGIN_USER_SUCCESS, user: res.user });
      })
      .catch(err => {
        console.log('check user method err 1:', err);
        if (err.status === 403) {
          const token = getRefreshToken();
          refreshToken(token)
            .then(res => {
              console.log('refresh token method res:', res);
              const { accessToken, refreshToken } = res;
              assignTokens(accessToken, refreshToken);
              dispatch(checkAuth());
            })
            .catch(err => {
              console.log('check user method err 2:', err);
              dispatch({ type: LOGIN_USER_FAILED });
            })
        } else {
          console.log('check user method err 2:', err);
          dispatch({ type: LOGIN_USER_FAILED });
        }
      })
  }
}

export function updateUserInfo(data: UserDataTypes) {
  return function (dispatch: any) {
    dispatch({ type: UPDATE_USER_REQUEST});
    patchUserData(data)
      .then(res => {
        console.log('update user res: ', res);
        dispatch({ type: UPDATE_USER_SUCCESS, user: res.user });
      })
      .catch(err => {
        console.log('update user err 1: ', err);
        if (err.status === 403) {
          const token = getRefreshToken();
          refreshToken(token)
            .then(res => {
              console.log('refresh token method res:', res);
              const { accessToken, refreshToken } = res;
              assignTokens(accessToken, refreshToken);
              dispatch(updateUserInfo(data));
            })
            .catch(err => {
              console.log('update user err 2: ', err);
              dispatch({ type: UPDATE_USER_FAILED });
            });
        } else {
          console.log('update user err 2: ', err);
          dispatch({ type: UPDATE_USER_FAILED });
        }
      });
  }
}

export function logoutUser() {
  return function (dispatch: any) {
    dispatch({ type: LOGOUT_USER_REQUEST });
    clearUserData()
      .then(res => {
        console.log('logout user method ok: ', res);
        clearTokens();
        dispatch({ type: LOGOUT_USER_SUCCESS });
      })
      .catch(err => {
        console.log('logout user method fail: ', err);
        dispatch({ type: LOGOUT_USER_FAILED });
      })
  }
}
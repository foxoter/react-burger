import { UserDataTypes } from '../../types/user-data-types';

import { sendNewUserData, sendAuthData, getUserData, clearUserData, refreshToken } from '../../helpers/api';
import { assignTokens, clearTokens, getCookie, getRefreshToken } from '../../helpers/tokens-helper';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

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
        console.log(getCookie('token'));
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
      })
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
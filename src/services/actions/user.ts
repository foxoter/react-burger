import { UserDataTypes } from '../../types/user-data-types';

import { sendNewUserData, sendAuthData } from '../../helpers/api';
import { assignTokens } from '../../helpers/cookie-helper';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';

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
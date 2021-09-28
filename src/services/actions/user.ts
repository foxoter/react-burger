import { UserDataTypes } from '../../types/user-data-types';

import { sendNewUserData } from '../../helpers/api';

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
        console.log('user actions: ', res);
        dispatch({ type: REGISTER_USER_SUCCESS, user: res.user });
      })
      .catch(err => {
        console.log('user actions: ', err);
        dispatch({ type: REGISTER_USER_FAILED});
      })
  }
}
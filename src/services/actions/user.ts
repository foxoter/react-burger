import { UserDataTypes, TNewUser } from '../types/user-data-types';
import { ResetPasswordTypes } from '../types/reset-password-types';
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

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_CLEAR,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_CLEAR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../constants/user';

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export const registerUserRequestAction = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST
});

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly user: TNewUser;
}

export const registerUserSuccessAction = (user: TNewUser): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  user,
});

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export const registerUserFailedAction = (): IRegisterUserFailedAction => ({
  type: REGISTER_USER_FAILED
});

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export const loginUserRequestAction = (): ILoginUserRequestAction => ({
  type: LOGIN_USER_REQUEST
});

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: TNewUser;
}

export const loginUserSuccessAction = (user: TNewUser): ILoginUserSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
  user
});

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export const loginUserFailedAction = (): ILoginUserFailedAction => ({
  type: LOGIN_USER_FAILED,
});

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export const logoutUserRequestAction = (): ILogoutUserRequestAction => ({
  type: LOGOUT_USER_REQUEST
});

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export const logoutUserSuccessAction = (): ILogoutUserSuccessAction => ({
  type: LOGOUT_USER_SUCCESS,
});

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export const logoutUserFailedAction = (): ILogoutUserFailedAction => ({
  type: LOGOUT_USER_FAILED,
});

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST,
});

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
});

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
  type: RESET_PASSWORD_FAILED,
});

export interface IResetPasswordClearAction {
  readonly type: typeof RESET_PASSWORD_CLEAR;
}

export const resetPasswordClearAction = (): IResetPasswordClearAction => ({
  type: RESET_PASSWORD_CLEAR,
});

export interface IUpdatePasswordRequestAction {
  readonly type: typeof UPDATE_PASSWORD_REQUEST;
}

export const updatePasswordRequestAction = (): IUpdatePasswordRequestAction => ({
  type: UPDATE_PASSWORD_REQUEST,
});

export interface IUpdatePasswordSuccessAction {
  readonly type: typeof UPDATE_PASSWORD_SUCCESS;
}

export const updatePasswordSuccessAction = (): IUpdatePasswordSuccessAction => ({
  type: UPDATE_PASSWORD_SUCCESS,
});

export interface IUpdatePasswordFailedAction {
  readonly type: typeof UPDATE_PASSWORD_FAILED;
}

export const updatePasswordFailedAction = (): IUpdatePasswordFailedAction => ({
  type: UPDATE_PASSWORD_FAILED,
});

export interface IUpdatePasswordClearAction {
  readonly type: typeof UPDATE_PASSWORD_CLEAR
}

export const updatePasswordClearAction = (): IUpdatePasswordClearAction => ({
  type: UPDATE_PASSWORD_CLEAR
})

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
});

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TNewUser
}

export const updateUserSuccessAction = (user: TNewUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export const updateUserFailedAction = (): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
});

export type TUserActions =
  IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IResetPasswordClearAction
  | IUpdatePasswordRequestAction
  | IUpdatePasswordSuccessAction
  | IUpdatePasswordFailedAction
  | IUpdatePasswordClearAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction


export function handleResetPasswordRequest(data: ResetPasswordTypes) {
  return function (dispatch: any) {
    dispatch(resetPasswordRequestAction());
    resetPasswordRequest(data)
      .then(res => {
        console.log('reset password request res: ', res);
        dispatch(resetPasswordSuccessAction());
      })
      .catch(err => {
        console.log('reset password request err: ', err);
        dispatch(resetPasswordFailedAction());
      })
      .finally(() => {
        console.log('reset pass finally...');
        dispatch(resetPasswordClearAction())
      });
  }
}

export function handlePasswordUpdate(data: ResetPasswordTypes) {
  return function (dispatch: any) {
    dispatch(updatePasswordRequestAction());
    confirmPasswordReset(data)
      .then(res => {
        console.log('confirm password reset res: ', res);
        dispatch(updatePasswordSuccessAction());
      })
      .catch(err => {
        console.log('confirm password reset err: ', err);
        dispatch(updatePasswordFailedAction());
      })
      .finally(() => {
        console.log('update pass finally...');
        dispatch(updatePasswordClearAction());
      });
  }
}

export function registerUser(data: UserDataTypes) {
  return function (dispatch: any) {
    dispatch(registerUserRequestAction());
    sendNewUserData(data)
      .then(res => {
        console.log('user register res: ', res);
        const { user, accessToken, refreshToken } = res;
        dispatch(registerUserSuccessAction(user));
        assignTokens(accessToken, refreshToken);
      })
      .catch(err => {
        console.log('user register res: ', err);
        dispatch(registerUserFailedAction());
      })
  }
}

export function authUser(data: UserDataTypes) {
  return function (dispatch: any) {
    dispatch(loginUserRequestAction());
    sendAuthData(data)
      .then(res => {
        console.log('user auth res: ', res);
        const { user, accessToken, refreshToken } = res;
        dispatch(loginUserSuccessAction(user));
        assignTokens(accessToken, refreshToken);
      })
      .catch(err => {
        console.log('user auth res: ', err);
        dispatch(loginUserFailedAction());
      })
  }
}

export function checkAuth() {
  return function (dispatch: any) {
    dispatch(loginUserRequestAction());
    getUserData()
      .then(res => {
        console.log('check user method res:', res);
        dispatch(loginUserSuccessAction(res.user));
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
              dispatch(loginUserFailedAction());
            })
        } else {
          console.log('check user method err 2:', err);
          dispatch(loginUserFailedAction());
        }
      })
  }
}

export function updateUserInfo(data: UserDataTypes) {
  return function (dispatch: any) {
    dispatch(updateUserRequestAction());
    patchUserData(data)
      .then(res => {
        console.log('update user res: ', res);
        dispatch(updateUserSuccessAction(res.user));
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
              dispatch(updateUserFailedAction());
            });
        } else {
          console.log('update user err 2: ', err);
          dispatch(updateUserFailedAction());
        }
      });
  }
}

export function logoutUser() {
  return function (dispatch: any) {
    dispatch(logoutUserRequestAction());
    clearUserData()
      .then(res => {
        console.log('logout user method ok: ', res);
        clearTokens();
        dispatch(logoutUserSuccessAction());
      })
      .catch(err => {
        console.log('logout user method fail: ', err);
        dispatch(logoutUserFailedAction());
      })
  }
}
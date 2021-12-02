import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_SUCCESS,
  RESET_PASSWORD_CLEAR,
  UPDATE_PASSWORD_CLEAR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from '../constants/user';
import { userReducer } from "./user-reducers";

const mockUserData = {
  email: 'some@email.com',
  name: 'Username'
}

const userInitialState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const resetPasswordRequestState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: true,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const resetPasswordFailedState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: true,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const resetPasswordSuccessState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: true,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const updatePasswordRequestState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: true,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const updatePasswordFailedState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: true,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const updatePasswordSuccessState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: true,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const registerUserRequestState = {
  currentUser: null,
  userRegisterRequest: true,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const registerUserFailedState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: true,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const registerUserSuccessState = {
  currentUser: mockUserData,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const loginUserRequestState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: true,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const loginUserFailedState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: true,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const loginUserSuccessState = {
  currentUser: mockUserData,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const logoutUserRequestState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: true,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const logoutUserFailedState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: true,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const updateUserRequestState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: true,
  updateProfileSuccess: false,
  updateProfileFailed: false,
}

const updateUserFailedState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: false,
  updateProfileFailed: true,
}

const updateUserSuccessState = {
  currentUser: mockUserData,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: false,
  updatePasswordRequest: false,
  updatePasswordSuccess: false,
  updatePasswordFailed: false,
  updateProfileRequest: false,
  updateProfileSuccess: true,
  updateProfileFailed: false,
}

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(userInitialState);
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(userReducer(userInitialState, { type: RESET_PASSWORD_REQUEST }))
      .toEqual(resetPasswordRequestState);
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(userReducer(resetPasswordRequestState, { type: RESET_PASSWORD_FAILED}))
      .toEqual(resetPasswordFailedState);
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    expect(userReducer(resetPasswordRequestState, { type: RESET_PASSWORD_SUCCESS }))
      .toEqual(resetPasswordSuccessState);
  });

  it('should handle RESET_PASSWORD_CLEAR', () => {
    expect(userReducer(resetPasswordSuccessState, { type: RESET_PASSWORD_CLEAR }))
      .toEqual(userInitialState);
  });

  it('should handle UPDATE_PASSWORD_REQUEST', () => {
    expect(userReducer(userInitialState, { type: UPDATE_PASSWORD_REQUEST }))
      .toEqual(updatePasswordRequestState);
  });

  it('should handle UPDATE_PASSWORD_FAILED', () => {
    expect(userReducer(updatePasswordRequestState, { type: UPDATE_PASSWORD_FAILED }))
      .toEqual(updatePasswordFailedState);
  });

  it('should handle UPDATE_PASSWORD_SUCCESS', () => {
    expect(userReducer(updatePasswordRequestState, { type: UPDATE_PASSWORD_SUCCESS }))
      .toEqual(updatePasswordSuccessState);
  });

  it('should handle UPDATE_PASSWORD_CLEAR', () => {
    expect(userReducer(updatePasswordSuccessState, { type: UPDATE_PASSWORD_CLEAR }))
      .toEqual(userInitialState);
  });

  it('should handle REGISTER_USER_REQUEST', () => {
    expect(userReducer(userInitialState, { type: REGISTER_USER_REQUEST }))
      .toEqual(registerUserRequestState);
  });

  it('should handle REGISTER_USER_FAILED', () => {
    expect(userReducer(registerUserRequestState, { type: REGISTER_USER_FAILED }))
      .toEqual(registerUserFailedState);
  });

  it('should handle REGISTER_USER_SUCCESS', () => {
    expect(userReducer(registerUserRequestState, { type: REGISTER_USER_SUCCESS, user: mockUserData }))
      .toEqual(registerUserSuccessState);
  });

  it('should handle LOGIN_USER_REQUEST', () => {
    expect(userReducer(userInitialState, { type: LOGIN_USER_REQUEST }))
      .toEqual(loginUserRequestState);
  });

  it('should handle LOGIN_USER_FAILED', () => {
    expect(userReducer(loginUserRequestState, { type: LOGIN_USER_FAILED }))
      .toEqual(loginUserFailedState);
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    expect(userReducer(loginUserRequestState, { type: LOGIN_USER_SUCCESS, user: mockUserData }))
      .toEqual(loginUserSuccessState);
  });

  it('should handle LOGOUT_USER_REQUEST', () => {
    expect(userReducer(userInitialState, { type: LOGOUT_USER_REQUEST }))
      .toEqual(logoutUserRequestState);
  });

  it('should handle LOGOUT_USER_FAILED', () => {
    expect(userReducer(logoutUserRequestState, { type: LOGOUT_USER_FAILED }))
      .toEqual(logoutUserFailedState);
  });

  it('should handle LOGOUT_USER_SUCCESS', () => {
    expect(userReducer(logoutUserRequestState, { type: LOGOUT_USER_SUCCESS }))
      .toEqual(userInitialState);
  });

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(userReducer(userInitialState, { type: UPDATE_USER_REQUEST }))
      .toEqual(updateUserRequestState);
  });

  it('should handle UPDATE_USER_FAILED', () => {
    expect(userReducer(updateUserRequestState, { type: UPDATE_USER_FAILED }))
      .toEqual(updateUserFailedState);
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(userReducer(updateUserRequestState, { type: UPDATE_USER_SUCCESS, user: mockUserData }))
      .toEqual(updateUserSuccessState);
  });
})
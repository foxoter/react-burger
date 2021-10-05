import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS,
} from '../actions/user';

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
}

export const userReducer = (state = userInitialState, action: any) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: false,
        resetPasswordFailed: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: true,
      }
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        userRegisterFailed: false,
        userRegisterRequest: true
      }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        userRegisterRequest: false,
        currentUser: null,
        userRegisterFailed: true,
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userRegisterRequest: false,
        userRegisterFailed: false,
        currentUser: action.user,
      }
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        userLoginFailedFailed: false,
        userLoginRequest: true,
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        userLoginRequest: false,
        userLoginFailed: true,
        currentUser: null
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userLoginRequest: false,
        userLoginFailed: false,
        currentUser: action.user
      }
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        userLogoutRequest: true,
      }
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        userLogoutRequest: false,
        userLogoutFailed: true,
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        userLogoutRequest: false,
        userLogoutFailed: false,
        currentUser: null
      }
    }
    default: {
      return state;
    }
  }
}
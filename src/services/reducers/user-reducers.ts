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
import { TNewUserData } from '../types/user-data-types';
import { TUserActions } from '../actions/user';

type TUserInitialState = {
  currentUser: TNewUserData | null;
  userRegisterRequest: boolean;
  userRegisterFailed: boolean;
  userLoginRequest: boolean;
  userLoginFailed: boolean;
  userLogoutRequest: boolean;
  userLogoutFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: boolean;
  updatePasswordRequest: boolean;
  updatePasswordSuccess: boolean;
  updatePasswordFailed: boolean;
  updateProfileRequest: boolean;
  updateProfileSuccess: boolean;
  updateProfileFailed: boolean;
}

const userInitialState: TUserInitialState = {
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

export const userReducer = (state = userInitialState, action: TUserActions) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordSuccess: false,
        resetPasswordFailed: false,
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
    case RESET_PASSWORD_CLEAR: {
      return {
        ...state,
        resetPasswordSuccess: false,
      }
    }
    case UPDATE_PASSWORD_REQUEST: {
      return {
        ...state,
        updatePasswordRequest: true,
        updatePasswordSuccess: false,
        updatePasswordFailed: false,
      }
    }
    case UPDATE_PASSWORD_FAILED: {
      return {
        ...state,
        updatePasswordRequest: false,
        updatePasswordSuccess: false,
        updatePasswordFailed: true,
      }
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        updatePasswordRequest: false,
        updatePasswordFailed: false,
        updatePasswordSuccess: true,
      }
    }
    case UPDATE_PASSWORD_CLEAR: {
      return {
        ...state,
        updatePasswordSuccess: false,
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
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateProfileRequest: true,
        updateProfileFailed: false,
        updateProfileSuccess: false,
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateProfileRequest: false,
        updateProfileSuccess: false,
        updateProfileFailed: true,
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateProfileRequest: false,
        updateProfileFailed: false,
        updateProfileSuccess: true,
        currentUser: action.user,
      }
    }
    default: {
      return state;
    }
  }
}
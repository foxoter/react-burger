import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from '../actions/user';

const userInitialState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userLoginRequest: false,
  userLoginFailed: false
}

export const userReducer = (state = userInitialState, action: any) => {
  switch (action.type) {
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
    case LOGOUT_USER: {
      return {
        ...state,
        currentUser: null
      }
    }
    default: {
      return state;
    }
  }
}
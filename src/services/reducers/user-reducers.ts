import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from '../actions/user';

const userInitialState = {
  currentUser: null,
  userRegisterRequest: false,
  userRegisterFailed: false,
}

export const userReducer = (state = userInitialState, action: any) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
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
    default: {
      return state;
    }
  }
}
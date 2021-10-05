import React, { useCallback, useEffect } from 'react';
import AuthForm from '../components/auth-form/auth-form';
import { Redirect } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, handleResetPasswordRequest } from '../services/actions/user';
import AppStateTypes from '../types/app-state-types';
import { ResetPasswordTypes } from '../types/reset-password-types';

function ForgotPassword() {
  const dispatch = useDispatch();
  const {
    currentUser,
    resetPasswordSuccess,
    userLoginRequest
  } = useSelector((state: AppStateTypes) => state.user);

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  const onSubmit = useCallback((data: ResetPasswordTypes) => {
    dispatch(handleResetPasswordRequest(data));
  }, [dispatch]);

  // if (currentUser) {
  //   return (
  //     <Redirect to='/' />
  //   )
  // }
  //
  // if (userLoginRequest) {
  //   return null;
  // }

  return resetPasswordSuccess ? <Redirect to='/reset-password' /> : <AuthForm type='forgot' submitCallback={onSubmit}/>
}

export default ForgotPassword;
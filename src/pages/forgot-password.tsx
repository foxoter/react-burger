import React, { useCallback, useEffect } from 'react';
import AuthForm from '../components/auth-form/auth-form';
import { Redirect, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, handleResetPasswordRequest } from '../services/actions/user';
import AppStateTypes from '../services/types/app-state-types';
import { ResetPasswordTypes } from '../services/types/reset-password-types';
import { LocationStateTypes } from '../services/types/location-state-types';
import Loader from '../components/loader/loader';

function ForgotPassword() {
  const dispatch = useDispatch();
  const {
    currentUser,
    resetPasswordSuccess,
    userLoginRequest
  } = useSelector((state: AppStateTypes) => state.user);
  const { state } = useLocation<LocationStateTypes>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const onSubmit = useCallback((data: ResetPasswordTypes) => {
    dispatch(handleResetPasswordRequest(data));
  }, [dispatch]);

  if (currentUser) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  }

  if (userLoginRequest) {
    return <Loader />
  }

  return (
    resetPasswordSuccess ?
      <Redirect to={{ pathname: '/reset-password', state: { referrer: 'forgot-password'} }} /> :
      <AuthForm type='forgot' submitCallback={onSubmit}/>
    )
}

export default ForgotPassword;
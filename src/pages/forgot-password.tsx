import React, { useCallback } from 'react';
import AuthForm from '../components/auth-form/auth-form';
import { Redirect } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { handleResetPasswordRequest } from '../services/actions/user';
import { UserDataTypes } from '../types/user-data-types';
import AppStateTypes from '../types/app-state-types';

function ForgotPassword() {
  const dispatch = useDispatch();
  const { resetPasswordSuccess } = useSelector((state: AppStateTypes) => state.user);
  const onSubmit = useCallback((data: UserDataTypes) => {
    dispatch(handleResetPasswordRequest(data));
  }, [dispatch, handleResetPasswordRequest]);

  return resetPasswordSuccess ? <Redirect to='/reset-password' /> : <AuthForm type='forgot' submitCallback={onSubmit}/>
}

export default ForgotPassword;
import React, { useCallback } from 'react';
import AuthForm from '../components/auth-form/auth-form';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPasswordTypes } from '../types/reset-password-types';
import { handlePasswordUpdate } from '../services/actions/user';
import AppStateTypes from '../types/app-state-types';
import { Redirect } from 'react-router-dom';

function ResetPassword() {
  const dispatch = useDispatch();
  const { updatePasswordSuccess } = useSelector((state: AppStateTypes) => state.user);

  const onSubmit = useCallback((data: ResetPasswordTypes) => {
    dispatch(handlePasswordUpdate(data));
  }, [dispatch]);


  return updatePasswordSuccess ? <Redirect to='/login' /> : <AuthForm type='reset' submitCallback={onSubmit}/>
}

export default ResetPassword;
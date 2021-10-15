import React, { useCallback, useEffect } from 'react';
import AuthForm from '../components/auth-form/auth-form';
import Loader from '../components/loader/loader';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPasswordTypes } from '../services/types/reset-password-types';
import { checkAuth, handlePasswordUpdate } from '../services/actions/user';
import AppStateTypes from '../services/types/app-state-types';
import { Redirect, useLocation } from 'react-router-dom';
import { LocationStateTypes } from '../services/types/location-state-types';

function ResetPassword() {
  const dispatch = useDispatch();
  const {
    updatePasswordSuccess,
    currentUser,
    userLoginRequest
  } = useSelector((state: AppStateTypes) => state.user);
  const { state } = useLocation<LocationStateTypes>();

  const onSubmit = useCallback((data: ResetPasswordTypes) => {
    dispatch(handlePasswordUpdate(data));
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (currentUser) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  }

  if (state?.referrer !== 'forgot-password') {
    return (
      <Redirect to={ state?.from || '/login' } />
    )
  }

  if (userLoginRequest) {
    return <Loader />;
  }

  return updatePasswordSuccess ? <Redirect to='/login' /> : <AuthForm type='reset' submitCallback={onSubmit}/>
}

export default ResetPassword;
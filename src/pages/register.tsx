import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import AuthForm from '../components/auth-form/auth-form';
import { checkAuth, registerUser } from '../services/actions/user';
import { UserDataTypes } from '../services/types/user-data-types';
import AppStateTypes from '../services/types/app-state-types';
import { LocationStateTypes } from '../services/types/location-state-types';

function Register() {
  const dispatch = useDispatch();
  const { currentUser, userLoginRequest } = useSelector((state: AppStateTypes) => state.user);
  const { state } = useLocation<LocationStateTypes>();

  const onRegister = (data: UserDataTypes) => {
    dispatch(registerUser(data));
  }

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (currentUser) {
    return (
      <Redirect to={ state?.from || '/'} />
    )
  }

  if (userLoginRequest) {
    return null;
  }

  return <AuthForm type='register' submitCallback={onRegister} />
}

export default React.memo(Register);
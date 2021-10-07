import React, { useEffect } from 'react';
import AuthForm from '../../components/auth-form/auth-form';

import { authUser, checkAuth } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { UserDataTypes } from '../../types/user-data-types';
import AppStateTypes from '../../types/app-state-types';
import { Redirect, useLocation } from 'react-router-dom';
import { LocationStateTypes } from '../../types/location-state-types';
import Loader from '../../components/loader/loader';

function Login() {
  const dispatch = useDispatch();
  const { currentUser, userLoginRequest } = useSelector((state: AppStateTypes) => state.user);
  const { state } = useLocation<LocationStateTypes>();

  const onLogin = (data: UserDataTypes) => {
    dispatch(authUser(data));
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
    return <Loader />;
  }

  return <AuthForm type='login' submitCallback={onLogin} />
}

export default React.memo(Login);
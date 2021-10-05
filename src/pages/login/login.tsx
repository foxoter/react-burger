import React, { useEffect } from 'react';
import AuthForm from '../../components/auth-form/auth-form';

import { authUser, checkAuth } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { UserDataTypes } from '../../types/user-data-types';
import AppStateTypes from '../../types/app-state-types';
import { Redirect, useLocation } from 'react-router-dom';

type LocationState = {
  from: {
    pathname: string;
  };
}


function Login() {
  const dispatch = useDispatch();
  const { currentUser, userLoginRequest } = useSelector((state: AppStateTypes) => state.user);
  const { state } = useLocation<LocationState>();

  const onLogin = (data: UserDataTypes) => {
    dispatch(authUser(data));
  }

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (userLoginRequest) {
    return null;
  }

  if (currentUser) {
    return (
      <Redirect to={ state?.from || '/'} />
    )
  }

  return <AuthForm type='login' submitCallback={onLogin} />
}

export default React.memo(Login);
import React from 'react';
import AuthForm from '../../components/auth-form/auth-form';

import { authUser } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { UserDataTypes } from '../../types/user-data-types';

function Login() {
  const dispatch = useDispatch();

  const onLogin = (data: UserDataTypes) => {
    dispatch(authUser(data));
  }
  return <AuthForm type='login' submitCallback={onLogin} />
}

export default React.memo(Login);
import React from 'react';
import AuthForm from '../components/auth-form/auth-form';

import { useDispatch } from 'react-redux';

import { registerUser } from '../services/actions/user';
import { UserDataTypes } from '../types/user-data-types';

function Register() {
  const dispatch = useDispatch();

  const onRegister = (data: UserDataTypes) => {
    dispatch(registerUser(data));
  }

  return <AuthForm type='register' submitCallback={onRegister} />
}

export default React.memo(Register);
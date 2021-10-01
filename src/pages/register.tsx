import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthForm from '../components/auth-form/auth-form';
import { registerUser } from '../services/actions/user';
import { UserDataTypes } from '../types/user-data-types';
import AppStateTypes from '../types/app-state-types';

function Register() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: AppStateTypes) => state.user);
  const history = useHistory();

  const onRegister = (data: UserDataTypes) => {
    dispatch(registerUser(data));
  }

  useEffect(() => {
    if (currentUser) {
      history.replace('/');
    }
  }, [currentUser, history]);

  return <AuthForm type='register' submitCallback={onRegister} />
}

export default React.memo(Register);
import React, { useEffect } from 'react';
import AuthForm from '../../components/auth-form/auth-form';

import { authUser } from '../../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { UserDataTypes } from '../../types/user-data-types';
import AppStateTypes from '../../types/app-state-types';
import { useHistory } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: AppStateTypes) => state.user);
  const history = useHistory();

  const onLogin = (data: UserDataTypes) => {
    dispatch(authUser(data));
  }

  useEffect(() => {
    if (currentUser) {
      history.replace('/');
    } else {
      console.log('login use effect: ', currentUser);
    }
  }, [currentUser, history]);

  return <AuthForm type='login' submitCallback={onLogin} />
}

export default React.memo(Login);
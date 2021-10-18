import { memo, FC, useCallback, useEffect } from 'react';
import AuthForm from '../components/auth-form/auth-form';
import { Redirect, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from '../services/hooks';
import { checkAuth, handleResetPasswordRequest } from '../services/actions/user';
import { TAuthFormData } from '../services/types/auth-form-types';
import { LocationStateTypes } from '../services/types/location-state-types';
import Loader from '../components/loader/loader';

const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const {
    currentUser,
    resetPasswordSuccess,
    userLoginRequest
  } = useSelector(state => state.user);
  const { state } = useLocation<LocationStateTypes>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const onSubmit = useCallback((data: TAuthFormData) => {
    dispatch(handleResetPasswordRequest(data));
  }, [dispatch]);

  if (currentUser) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  }

  if (userLoginRequest) {
    return <Loader />
  }

  return (
    resetPasswordSuccess ?
      <Redirect to={{ pathname: '/reset-password', state: { referrer: 'forgot-password'} }} /> :
      <AuthForm type='forgot' submitCallback={onSubmit}/>
    )
}

export default memo(ForgotPassword);
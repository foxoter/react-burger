import { memo, FC, useEffect } from 'react';
import AuthForm from '../components/auth-form/auth-form';

import { authUser, checkAuth } from '../services/actions/user';
import { useDispatch, useSelector } from '../services/hooks';
import { Redirect, useLocation } from 'react-router-dom';
import { LocationStateTypes } from '../services/types/location-state-types';
import Loader from '../components/loader/loader';
import { TAuthFormData } from '../services/types/auth-form-types';

const Login: FC = () => {
  const dispatch = useDispatch();
  const { currentUser, userLoginRequest } = useSelector(state => state.user);
  const { state } = useLocation<LocationStateTypes>();

  const onLogin = (data: TAuthFormData) => {
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

export default memo(Login);
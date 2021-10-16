import { memo, FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import { Redirect, useLocation } from 'react-router-dom';

import AuthForm from '../components/auth-form/auth-form';
import { checkAuth, registerUser } from '../services/actions/user';
import { TAuthFormData } from '../services/types/auth-form-types';
import { LocationStateTypes } from '../services/types/location-state-types';

const Register: FC = () => {
  const dispatch = useDispatch();
  const { currentUser, userLoginRequest } = useSelector(state => state.user);
  const { state } = useLocation<LocationStateTypes>();

  const onRegister = (data: TAuthFormData) => {
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

export default memo(Register);
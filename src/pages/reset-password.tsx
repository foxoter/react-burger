import { memo, FC, useCallback, useEffect } from 'react';
import AuthForm from '../components/auth-form/auth-form';
import Loader from '../components/loader/loader';
import { useDispatch, useSelector } from '../services/hooks';
import { TAuthFormData } from '../services/types/auth-form-types';
import { checkAuth, handlePasswordUpdate } from '../services/actions/user';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { LocationStateTypes } from '../services/types/location-state-types';

const ResetPassword: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    updatePasswordSuccess,
    currentUser,
    userLoginRequest
  } = useSelector(state => state.user);
  const { state } = useLocation<LocationStateTypes>();

  const onSubmit = useCallback((data: TAuthFormData) => {
    dispatch(handlePasswordUpdate(data));
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (currentUser) {
    return (
      <Redirect to={ state?.from || '/' } />
    )
  }

  if (state?.referrer !== 'forgot-password' || history.action === 'POP') {
    return (
      <Redirect to={ state?.from || '/login' } />
    )
  }

  if (userLoginRequest) {
    return <Loader />;
  }

  return updatePasswordSuccess ? <Redirect to='/login' /> : <AuthForm type='reset' submitCallback={onSubmit}/>
}

export default memo(ResetPassword);
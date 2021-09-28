import React from 'react';
import AuthForm from '../../components/auth-form/auth-form';

import { authUser } from '../../services/actions/user';

function Login() {
  return <AuthForm type='login' submitCallback={authUser} withDispatch />
}

export default React.memo(Login);
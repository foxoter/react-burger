import React from 'react';
import AuthForm from '../components/auth-form/auth-form';

import { registerUser } from '../services/actions/user';

function Register() {
  return <AuthForm type='register' submitCallback={registerUser} withDispatch />
}

export default React.memo(Register);
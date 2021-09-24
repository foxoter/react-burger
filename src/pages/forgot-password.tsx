import React from 'react';
import AuthForm from '../components/auth-form/auth-form';

import { resetPasswordRequest } from '../helpers/api';

function ForgotPassword() {
  return <AuthForm type='forgot' submitCallback={resetPasswordRequest}/>
}

export default ForgotPassword;
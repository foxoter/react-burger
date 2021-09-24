import React from 'react';
import AuthForm from '../components/auth-form/auth-form';

import { confirmPasswordReset } from '../helpers/api';

function ResetPassword() {
  return <AuthForm type='reset' submitCallback={confirmPasswordReset}/>
}

export default ResetPassword;
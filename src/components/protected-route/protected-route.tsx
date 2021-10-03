import React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  children: React.ReactNode
  path: string
  exact?: boolean
}

function ProtectedRoute(props: Props) {
  const { children, ...rest} = props;

  return (
    <Route {...rest} render={() => children} />
  )
}

export default ProtectedRoute;
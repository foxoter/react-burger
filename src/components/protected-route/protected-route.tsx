import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppStateTypes from '../../types/app-state-types';
import { checkAuth } from '../../services/actions/user';

type Props = {
  children: React.ReactNode
  path: string
  exact?: boolean
}

function ProtectedRoute(props: Props) {
  const { children, ...rest} = props;
  const { currentUser } = useSelector((state: AppStateTypes) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);


  return (
    <Route
      {...rest}
      render={({ location }) => currentUser ?
        children :
        <Redirect
          to={{ pathname: '/login', state: { from: location } }}
        />}
    />
  )
}

export default ProtectedRoute;
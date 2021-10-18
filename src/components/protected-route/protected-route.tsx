import { memo, FC, ReactNode, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { checkAuth } from '../../services/actions/user';

type Props = {
  children: ReactNode
  path: string
  exact?: boolean
}

const ProtectedRoute: FC<Props> = ({ children, ...rest }) => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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

export default memo(ProtectedRoute);
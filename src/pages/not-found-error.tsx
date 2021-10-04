import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../services/actions/user';

function NotFoundError() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return <div>not found page</div>
}

export default NotFoundError;
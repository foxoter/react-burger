import React, { useEffect } from 'react';
import OrdersList from '../components/orders-list/orders-list';
import { useDispatch, useSelector } from '../services/hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/constants/ws-actions';

function OrderHistory() {
  const dispatch = useDispatch();
  const { ordersInfo } = useSelector(state => state.wsFeed);

  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED })
      }
    },
    [dispatch]
  );

  return <div>hello</div>
  // return (<OrdersList authorized />)
}

export default OrderHistory;
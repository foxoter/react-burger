import React, { useEffect } from 'react';
import OrdersList from '../components/orders-list/orders-list';
import { useDispatch, useSelector } from '../services/hooks';
import { WS_CONNECTION_CLOSED_AUTH, WS_CONNECTION_START_AUTH } from '../services/constants/ws-auth-actions';

function OrderHistory() {
  const dispatch = useDispatch();
  const { ordersInfo } = useSelector(state => state.wsAuthFeed);

  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START_AUTH });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED_AUTH })
      }
    },
    [dispatch]
  );

  return (
    <>
      {ordersInfo && <OrdersList authorized data={ordersInfo}/>}
    </>
    )
}

export default OrderHistory;
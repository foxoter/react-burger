import { FC, memo, useEffect } from 'react';

import { useDispatch } from '../services/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/constants/ws-actions';

import MainContainer from '../components/main-container/main-container';
import OrdersList from '../components/orders-list/orders-list';
import OrdersInfo from '../components/orders-info/orders-info';

const mockData = {
  ordersReady: ['034533', '034532', '034531', '034530', '034524', '034527'],
  ordersInProgress: ['034555', '034543', '034529'],
  totalToday: '138',
  total: '28752'
}

const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED })
      }
    },
    [dispatch]
  );
  return (
    <MainContainer title='Лента заказов'>
      <OrdersList />
      <OrdersInfo
        ordersReady={mockData.ordersReady}
        ordersInProgress={mockData.ordersInProgress}
        doneToday={mockData.totalToday}
        doneEver={mockData.total}
      />
    </MainContainer>
  )
}

export default memo(Feed);
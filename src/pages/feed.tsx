import { FC, memo, useEffect } from 'react';

import { useDispatch, useSelector } from '../services/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/constants/ws-actions';

import MainContainer from '../components/main-container/main-container';
import OrdersList from '../components/orders-list/orders-list';
import OrdersInfo from '../components/orders-info/orders-info';

const Feed: FC = () => {
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

  return (
    <>
      {ordersInfo &&
        <MainContainer title='Лента заказов'>
            <OrdersList data={ordersInfo} />
            <OrdersInfo data={ordersInfo} />
        </MainContainer>
      }
    </>
  )
}

export default memo(Feed);
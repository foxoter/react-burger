import { FC, memo } from 'react';
import MainContainer from '../components/main-container/main-container';
import OrdersList from '../components/orders-list/orders-list';
import OrdersInfo from '../components/orders-info/orders-info';

const Feed: FC = () => {
  return (
    <MainContainer title='Лента заказов'>
      <OrdersList />
      <OrdersInfo />
    </MainContainer>
  )
}

export default memo(Feed);
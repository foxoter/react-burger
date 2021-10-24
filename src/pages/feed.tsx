import { FC, memo } from 'react';
import MainContainer from '../components/main-container/main-container';
import OrdersList from '../components/orders-list/orders-list';
import OrdersInfo from '../components/orders-info/orders-info';

const mockData = {
  ordersReady: ['034533', '034532', '034531', '034530', '034524', '034527'],
  ordersInProgress: ['034555', '034543', '034529'],
  doneToday: '138',
  doneEver: '28752'
}

const Feed: FC = () => {
  return (
    <MainContainer title='Лента заказов'>
      <OrdersList />
      <OrdersInfo
        ordersReady={mockData.ordersReady}
        ordersInProgress={mockData.ordersInProgress}
        doneToday={mockData.doneToday}
        doneEver={mockData.doneEver}
      />
    </MainContainer>
  )
}

export default memo(Feed);
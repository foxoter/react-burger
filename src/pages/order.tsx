import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { mockData2 } from '../components/orders-list/tempData';
import NotFoundError from './not-found-error';

const OrderPage: FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = mockData2.find(item => item._id === orderId);

  return (
    <>
      {
        order ?
          <div>{order?.name}</div> :
          <NotFoundError />
      }
    </>
  )

}

export default memo(OrderPage);
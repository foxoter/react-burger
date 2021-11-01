import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { mockData2 } from '../components/orders-list/tempData';
import NotFoundError from './not-found-error';
import OrderDetailsItem from '../components/order-details-item/order-details-item';

const OrderPage: FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const order = mockData2.find(item => item._id === orderId);

  return (
    <>
      {
        order ?
          <div className='mt-20'>
            {/*<OrderDetailsItem />*/}
          </div> :
          <NotFoundError />
      }
    </>
  )
}

export default memo(OrderPage);
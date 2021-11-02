import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../services/hooks';
import { mockData2 } from '../components/orders-list/tempData';
import NotFoundError from './not-found-error';
import { getOrderData } from '../helpers/orders-helper';
import OrderDetailsItem from '../components/order-details-item/order-details-item';


const OrderPage: FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { ingredientsList, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
  const order = mockData2.find(item => item._id === orderId);
  const orderData = order ? getOrderData(order, ingredientsList) : order;

  return (
    <>
      {
        order ?
          <div className='mt-20'>
            <OrderDetailsItem data={orderData} withoutModal />
          </div> :
          <NotFoundError />
      }
    </>
  )
}

export default memo(OrderPage);
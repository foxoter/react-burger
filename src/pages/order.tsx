import { memo, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks';
import NotFoundError from './not-found-error';
import { getOrderData } from '../helpers/orders-helper';
import OrderDetailsItem from '../components/order-details-item/order-details-item';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/constants/ws-actions';
import Loader from '../components/loader/loader';


const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId: string }>();
  const { ingredientsList } = useSelector(state => state.ingredients);
  const { ordersInfo } = useSelector(state => state.wsFeed);
  const order = ordersInfo?.orders.find(item => item._id === orderId);
  const orderData = order ? getOrderData(order, ingredientsList) : order;


  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START });
      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED })
      }
    },
    [dispatch]
  );

  if (!ordersInfo || !ingredientsList) {
    return <Loader />
  }

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
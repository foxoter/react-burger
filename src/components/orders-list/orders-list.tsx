import { FC, memo } from 'react';
import { useSelector } from '../../services/hooks';
import OrdersListItem from '../orders-list-item/orders-list-item';
import { TOrderRenderData, TOrdersInfo } from '../../services/types/t-order-data';
import { completeOrdersData } from '../../helpers/orders-helper';
import styles from './orders-list.module.css';

type Props = {
  authorized?: boolean
  data: TOrdersInfo
}


const OrdersList: FC<Props> = ({ authorized, data}) => {
  const { ingredientsList } = useSelector(state => state.ingredients);
  const orders = authorized ? [...data.orders].reverse() : data.orders;

  return (
    <div className={styles.sections}>
      {ingredientsList.length > 0 &&
        completeOrdersData(orders, ingredientsList).map((order: TOrderRenderData) => (
            <OrdersListItem data={order} key={order._id} authorized={authorized} />
          ))
      }
    </div>
  )
}

export default memo(OrdersList);
import { FC, memo } from 'react';
import { useSelector } from '../../services/hooks';
import OrdersListItem from '../orders-list-item/orders-list-item';
import { TOrderRenderData } from '../../services/types/t-order-data';
import { mockData2 } from './tempData';
import { completeOrdersData } from '../../helpers/orders-helper';
import styles from './orders-list.module.css';

type Props = {
  authorized?: boolean
}


const OrdersList: FC<Props> = ({ authorized }) => {
  const { ingredientsList } = useSelector(state => state.ingredients);

  return (
    <div className={styles.sections}>
      {ingredientsList.length > 0 &&
        completeOrdersData(mockData2, ingredientsList).map((order: TOrderRenderData) => (
            <OrdersListItem data={order} key={order._id} authorized={authorized} />
          ))
      }
    </div>
  )
}

export default memo(OrdersList);
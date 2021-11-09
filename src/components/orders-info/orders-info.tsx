import { FC, memo } from 'react';

import styles from './orders-info.module.css';
import MainContainer from '../main-container/main-container';
import { TOrdersInfo } from '../../services/types/t-order-data';

type Props = {
  data: TOrdersInfo
}

const OrdersInfo: FC<Props> = ({ data }) => {
  const { total, totalToday, orders } = data;
  const ordersReady = orders.filter(item => item.status === 'done');
  const ordersInProgress = orders.filter(item => item.status === 'pending');
  console.log(ordersReady, ordersInProgress);
  return (
    <div>
      <MainContainer className='mb-15'>
        <div>
          <h3 className='mb-6 text text_type_main-medium'>Готовы:</h3>
          <ul className={styles.list}>
            {ordersReady.map(order =>
              <li key={String(order.number)}>
                <span className={`${styles.ready} text text_type_digits-default`}>
                  {order.number}
                </span>
              </li>
            )}
          </ul>
        </div>
        <div>
          <p className='mb-6 text text_type_main-medium'>В работе:</p>
          {ordersInProgress.map(order =>
            <p key={String(order.number)} className="text text_type_digits-default">{order.number}</p>
          )}
        </div>
      </MainContainer>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.glow} text text_type_digits-large`}>{total}</p>
      </div>
      <div>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.glow} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </div>
  )
}

export default memo(OrdersInfo);
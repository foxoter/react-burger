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
          <h3 className='mb-6 text text_type_main-medium'>В работе:</h3>
          <ul className={styles.list}>
            {ordersInProgress.map(order =>
              <li key={String(order.number)}>
                <span className='text text_type_digits-default'>
                  {order.number}
                </span>
              </li>
            )}
          </ul>
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
import { FC, memo } from 'react';

import styles from './orders-info.module.css';
import MainContainer from '../main-container/main-container';



type Props = {
  ordersReady: Array<string> | []
  ordersInProgress: Array<string> | []
  doneToday: string
  doneEver: string
}

const OrdersInfo: FC<Props> = ({ doneEver, doneToday, ordersReady, ordersInProgress }) => {
  return (
    <div>
      <MainContainer className='mb-15'>
        <div>
          <p className='mb-6 text text_type_main-medium'>Готовы:</p>
          {ordersReady.map(order =>
            <p key={String(order)} className={`${styles.ready} text text_type_digits-default`}>{order}</p>
          )}
        </div>
        <div>
          <p className='mb-6 text text_type_main-medium'>В работе:</p>
          {ordersInProgress.map(order =>
            <p key={String(order)} className="text text_type_digits-default">{order}</p>
          )}
        </div>
      </MainContainer>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.glow} text text_type_digits-large`}>{doneEver}</p>
      </div>
      <div>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.glow} text text_type_digits-large`}>{doneToday}</p>
      </div>
    </div>
  )
}

export default memo(OrdersInfo);
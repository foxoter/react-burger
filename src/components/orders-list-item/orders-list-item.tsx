import { FC, memo } from 'react';

import styles from './orders-list-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
  id: number
}

const OrdersListItem: FC = () => {
  return (
    <div className={`${styles.container} p-6`}>
      <div className={`${styles.credentials} mb-6`}>
        <span className='text text_type_digits-default'>#034535</span>
        <span className='text text_type_main-default text_color_inactive'>Сегодня, 16:20 i-GMT+3</span>
      </div>
      <p className='text text_type_main-medium mb-6'>Death Star Starship Main бургер</p>
      <div className={styles.ingredients}>
        <div>ingredients</div>
        <div className={styles.price}>
          <span className='text text_type_digits-default'>480</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default memo(OrdersListItem);
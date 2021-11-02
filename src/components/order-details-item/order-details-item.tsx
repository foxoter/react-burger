import { FC, memo } from 'react';
import { TOrderRenderData } from '../../services/types/t-order-data';

import styles from './order-details-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
  data: TOrderRenderData | undefined
}

const OrderDetailsItem: FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }
  const { name, status, fullIngredients, price, createdAt } = data;
  return (
    <div className={styles.container}>
      <h3 className='mt-5 mb-5 text text_type_main-medium'>{name}</h3>
      <p className={`${styles.ready} text text_type_main-default mb-10`}>{status === 'done' ? 'Выполнен' : 'Готовится'}</p>
      <p className='mt-5 mb-5 text text_type_main-medium'>Состав:</p>
      <div className='mb-10'>
        {fullIngredients.map((ingredient, idx) => {
          return (
            <div className={styles.ingredient} key={ingredient._id + idx}>
              <div className={styles.ingredient_title}>
                <div className={styles.image} style={{ backgroundImage: `url(${ingredient.image_large})` }}/>
                <p className={`${styles.ingredient_name} text text_type_main-default`}>{ingredient.name}</p>
              </div>
              <div className={styles.price}>
                <span className='text text_type_digits-default'>1 x {ingredient.price}</span>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.ingredient}>
        <span className='text text_type_main-default text_color_inactive'>{createdAt}</span>
        <div className={styles.price}>
          <span className='text text_type_digits-default'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default memo(OrderDetailsItem);
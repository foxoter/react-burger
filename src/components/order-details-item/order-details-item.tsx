import { FC, memo } from 'react';
import { TOrderRenderData } from '../../services/types/t-order-data';

import styles from './order-details-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
  data: TOrderRenderData | undefined
  withoutModal?: boolean
}

const OrderDetailsItem: FC<Props> = ({ withoutModal, data }) => {
  if (!data) {
    return null;
  }
  const { name, status, fullIngredients, price, parsedTime, number } = data;

  let statusStyles;
  switch (status) {
    case 'created':
      statusStyles = { color: 'white', message: 'Создан' }
      break
    case 'pending':
      statusStyles = { color: 'white', message: 'Готовится' }
      break
    case 'done':
      statusStyles = { message: 'Выполнен' }
      break
    default:
      statusStyles = { message: 'Создан' }
      break
  }

  return (
    <div className={styles.container} style={ withoutModal ? { marginBottom: '40px' } : {}}>
      {withoutModal &&
        <p
          className='text text_type_digits-default'
          style={{ textAlign: 'center' }}
        >
          #{number}
        </p>
      }
      <h3 className='mt-5 mb-5 text text_type_main-medium'>{name}</h3>
      <p className={`${styles.ready} text text_type_main-default mb-10`} style={{ color: statusStyles.color }}>{statusStyles.message}</p>
      <p className='mt-5 mb-5 text text_type_main-medium'>Состав:</p>
      <div className={`${styles.list} mb-10`}>
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
        <span className='text text_type_main-default text_color_inactive'>{parsedTime}</span>
        <div className={styles.price}>
          <span className='text text_type_digits-default'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default memo(OrderDetailsItem);
import { FC, memo } from 'react';

import styles from './orders-list-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderRenderData } from '../../services/types/t-order-data';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {
  data: TOrderRenderData
}

const OrdersListItem: FC<Props> = ({ data }) => {
  const { images, name, createdAt, number, price, _id } = data;
  const history = useHistory();
  const location = useLocation();
  const renderIngredientsImages = () => {
    let position = -50;
    let zIndex = 10;
    const excessCount = images.length - 5;
    return images.map((item, index) => {
      position += 50;
      zIndex -= 1;
      const key = String(index + position + zIndex)
        if (index === 0) {
          return (
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${item})`, zIndex: zIndex }}
              key={key}
            />
          )
        } else if (index < 5) {
          return (
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${item})`, position: 'absolute', left: `${position}px`, zIndex: zIndex }}
              key={key}
            />
          )
        }
        else if (index === 5) {
          return (
            <div
              className={`${styles.image} ${styles.image_excess}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${item})`,
                position: 'absolute',
                left: `${position}px`,
                zIndex: zIndex
              }}
              key={key}
            >
              <p className='text text_type_digits-default'>+{excessCount}</p>
            </div>
          )
        }
    })
  }

  const onClick = (): void => {
    history.push(`/feed/${_id}`, { background: location, order: data });
  }

  return (
    <div className={`${styles.container} p-6`} onClick={onClick}>
      <div className={`${styles.credentials} mb-6`}>
        <span className='text text_type_digits-default'>#{number}</span>
        <span className='text text_type_main-default text_color_inactive'>{createdAt}</span>
      </div>
      <p className='text text_type_main-medium mb-6'>{name}</p>
      <div className={styles.ingredients}>
        <div className={styles.images}>
          {renderIngredientsImages()}
        </div>
        <div className={styles.price}>
          <span className='text text_type_digits-default'>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default memo(OrdersListItem);
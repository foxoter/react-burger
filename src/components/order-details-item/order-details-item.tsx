import { FC, memo } from 'react';
import styles from './order-details-item.module.css';
import { TOrderRenderData } from '../../services/types/t-order-data';

type Props = {
  data: TOrderRenderData | undefined
}

const OrderDetailsItem: FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }
  const { number } = data;
  return (
    <div className={styles.container}>
      <h3>{number}</h3>
    </div>
  )
}

export default memo(OrderDetailsItem);
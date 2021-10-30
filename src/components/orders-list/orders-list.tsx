import { FC, memo } from 'react';
import { useSelector } from '../../services/hooks';
import OrdersListItem from '../orders-list-item/orders-list-item';
import { TOrderData, TOrderRenderData } from '../../services/types/t-order-data';
import { mockData2 } from './tempData';
import styles from './orders-list.module.css';


const OrdersList: FC = () => {
  const { ingredientsList } = useSelector(state => state.ingredients);

  const ordersData: TOrderRenderData[] = mockData2.map((item: TOrderData): TOrderRenderData => {
    // @ts-ignore
    const newItem: TOrderRenderData = item;
    let images: string[] = [];
    let price = 0;
    item.ingredients.forEach((ingredientId: string) => {
      const ingredient = ingredientsList.find(i => i._id === ingredientId);
      if (ingredient) {
        images.push(ingredient.image_large);
        price += ingredient.price;
      }
    });
    newItem.images = images;
    newItem.price = price;
    return newItem;
  });

  return (
    <div className={styles.sections}>
      {ingredientsList.length > 0 &&
        ordersData.map((order: TOrderRenderData) => (
          <OrdersListItem data={order} key={order._id} />
          ))
      }
    </div>
  )
}

export default memo(OrdersList);
import { FC, memo } from 'react';
import { useSelector } from '../../services/hooks';
import OrdersListItem from '../orders-list-item/orders-list-item';
import { TOrderData, TOrderRenderData } from '../../services/types/t-order-data';
import { mockData2 } from './tempData';
import styles from './orders-list.module.css';


const OrdersList: FC = () => {
  const { ingredientsList } = useSelector(state => state.ingredients);

  const completeOrderData = (ordersData: TOrderData[]): TOrderRenderData[] => {
    return  ordersData.map(item => {
      const data = {
        images: [],
        price: 0,
        fullIngredients: []
      };
      const newItem: TOrderRenderData = { ...item, ...data };
      newItem.fullIngredients = [];
      item.ingredients.forEach((ingredientId: string) => {
        const ingredient = ingredientsList.find(i => i._id === ingredientId);
        if (ingredient) {
          newItem.fullIngredients.push(ingredient);
          newItem.images.push(ingredient.image_large);
          newItem.price += ingredient.price;
        }
      });
      return newItem;
    })
  }

  return (
    <div className={styles.sections}>
      {ingredientsList.length > 0 &&
        completeOrderData(mockData2).map((order: TOrderRenderData) => (
            <OrdersListItem data={order} key={order._id} />
          ))
      }
    </div>
  )
}

export default memo(OrdersList);
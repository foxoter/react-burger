import { FC, memo } from 'react';
import { useSelector } from '../../services/hooks';
import OrdersListItem from '../orders-list-item/orders-list-item';
import { TOrderData, TOrderRenderData } from '../../services/types/t-order-data';

const mockData2: TOrderData[] = [
    {
      _id: "617566c67deb54001ba6231e",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733cd",
      ],
      status: "done",
      name: "Spicy флюоресцентный space экзо-плантаго антарианский бургер",
      createdAt: "2021-10-24T13:59:34.396Z",
      updatedAt: "2021-10-24T13:59:34.514Z",
      number: 4907
    },
    {
      _id: "617566c67deb54001ba62312e",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733cd",
      ],
      status: "done",
      name: "Spicy флюоресцентный space экзо-плантаго антарианский бургер",
      createdAt: "2021-10-24T13:59:34.396Z",
      updatedAt: "2021-10-24T13:59:34.514Z",
      number: 4907
    }
  ]

const OrdersList: FC = () => {
  const { ingredientsList } = useSelector(state => state.ingredients);

  // @ts-ignore
  const ordersData: TOrderRenderData[] = mockData2.map((item: TOrderData) => {
    const newOrder: TOrderData | TOrderRenderData = item;
    let images: string[] = [];
    let price = 0;
    item.ingredients.forEach((ingredientId: string) => {
      const ingredient = ingredientsList.find(i => i._id === ingredientId);
      if (ingredient) {
        images.push(ingredient.image_large);
        price += ingredient.price;
      }
    });
    // @ts-ignore
    newOrder.images = images;
    // @ts-ignore
    newOrder.price = price;
    return item;
  });

  return (
    <div>
      {ingredientsList.length > 0 &&
        ordersData.map((order: TOrderRenderData) => (
          <OrdersListItem data={order} key={order._id} />
          ))
      }
    </div>
  )
}

export default memo(OrdersList);
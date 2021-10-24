import { FC, memo } from 'react';
import { useSelector } from '../../services/hooks';
import OrdersListItem from '../orders-list-item/orders-list-item';

const mockData = [
  {
    _id: "617566c67deb54001ba6231e",
    ingredients: [
      "60d3b41abdacab0026a733c7",
      "60d3b41abdacab0026a733c7",
      "60d3b41abdacab0026a733cc",
      "60d3b41abdacab0026a733cf",
      "60d3b41abdacab0026a733d3",
      "60d3b41abdacab0026a733cd"
    ],
    status: "done",
    name: "Spicy флюоресцентный space экзо-плантаго антарианский бургер",
    createdAt: "2021-10-24T13:59:34.396Z",
    updatedAt: "2021-10-24T13:59:34.514Z",
    number: 4907
  },
]

const OrdersList: FC = () => {
  const { ingredientsList } = useSelector(state => state.ingredients);

  return (
    <div>
      <OrdersListItem />
    </div>
  )
}

export default memo(OrdersList);
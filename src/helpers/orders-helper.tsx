import { TOrderData, TOrderRenderData } from '../services/types/t-order-data';
import TBurgersDataTypes from '../services/types/t-burgers-data-types';
import { parseTime } from './time-helper';

const getOrderData = (order: TOrderData, ingredientsList: TBurgersDataTypes[]): TOrderRenderData => {
  const data = {
    images: [],
    price: 0,
    fullIngredients: [],
    parsedTime: ''
  };
  const orderData: TOrderRenderData = { ...order, ...data };
  order.ingredients.forEach((ingredientId: string) => {
    const ingredient = ingredientsList.find(i => i._id === ingredientId);
    if (ingredient) {
      orderData.fullIngredients.push(ingredient);
      orderData.images.push(ingredient.image_large);
      orderData.price += ingredient.price;
      orderData.parsedTime = parseTime(orderData.createdAt);
    }
  });
  return orderData;
}

const completeOrdersData = (ordersData: TOrderData[], ingredientsList: TBurgersDataTypes[]): TOrderRenderData[] => {
  return ordersData.map(item => {
    const data = {
      images: [],
      price: 0,
      fullIngredients: [],
      parsedTime: ''
    };
    const newItem: TOrderRenderData = { ...item, ...data };
    item.ingredients.forEach((ingredientId: string) => {
      const ingredient = ingredientsList.find(i => i._id === ingredientId);
      if (ingredient) {
        newItem.fullIngredients.push(ingredient);
        newItem.images.push(ingredient.image_large);
        newItem.price += ingredient.price;
        newItem.parsedTime = parseTime(newItem.createdAt);
      }
    });
    return newItem;
  })
}

export { getOrderData, completeOrdersData }
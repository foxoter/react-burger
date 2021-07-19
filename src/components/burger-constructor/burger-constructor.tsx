import React, { useCallback, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import OrderDetails from '../order-details/order-details';

import burgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

import { useDispatch, useSelector } from 'react-redux';
import AppState from '../../types/app-state-types';

import { ADD_INGREDIENT, DELETE_ORDER_ID, REWRITE_INGREDIENTS, placeOrder } from '../../services/actions/ingredients';


function BurgerConstructor() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const dispatch = useDispatch();
  const { constructorItems, currentOrderId } = useSelector((state: AppState) => state.ingredients);
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredientData) {
      dispatch({ type: ADD_INGREDIENT, payload: ingredientData });
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const bun = constructorItems.find(item => item.type === 'bun');
  const otherItems = constructorItems.filter(item => item.type !== 'bun');

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const storageArrCopy = constructorItems;
      const dragItem = otherItems[dragIndex];
      const newArr = update(otherItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      });
      const resultArr = storageArrCopy.filter(i => i.type === 'bun').concat(...newArr);
      dispatch({ type: REWRITE_INGREDIENTS, payload: resultArr });
    },
    [constructorItems, dispatch, otherItems]);

  const otherElements = otherItems.map((ingredient, index) => {
    return <BurgerConstructorItem data={ingredient} key={ingredient.uuid} index={index} moveItem={moveCard} />
  });

  const orderTotalValue = useMemo(() => {
    if (constructorItems.length) {
      return constructorItems.reduce((sum, current) => sum
        += (current.type === 'bun' ? current.price * 2 : current.price), 0);
    }
  }, [constructorItems]);

  const closeOrder = () => {
    setIsDetailsOpen(false);
    dispatch({ type: DELETE_ORDER_ID });
  }

  const openOrder = () => {
    const order = {
      ingredients: constructorItems.map(item => item._id)
    };
    dispatch(placeOrder(order));
    setIsDetailsOpen(true);
  }

  return (
    <div
      className={`${burgerConstructorStyles.container} ${isHover ? burgerConstructorStyles.bordered : ''}`}
      ref={dropTarget}
    >
      {isDetailsOpen && currentOrderId &&
        <Modal handleClose={closeOrder}>
          <OrderDetails orderId={currentOrderId}/>
        </Modal>
      }
      {bun &&
        <BurgerConstructorItem data={bun} headItem index={999} moveItem={moveCard} />
      }
      {otherItems &&
        <div className={burgerConstructorStyles.items}>{otherElements}</div>
      }
      {bun &&
        <BurgerConstructorItem data={bun} tailItem index={999} moveItem={moveCard} />
      }
      {constructorItems.length > 0 &&
        <div className={`${burgerConstructorStyles.price} pl-4 pr-4`}>
            <p className="text text_type_digits-medium">{orderTotalValue}</p>
            <CurrencyIcon type="primary"/>
            <Button type="primary" size="large" onClick={openOrder}>
                Оформить заказ
            </Button>
        </div>
      }
    </div>
  );
}

export default React.memo(BurgerConstructor);
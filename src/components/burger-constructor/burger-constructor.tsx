import React, { useCallback, useMemo, useState } from 'react';
import { useDrop } from "react-dnd";

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

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // // console.log('dragindex', dragIndex);
      // // console.log('hoverindex', hoverIndex);
      const newArr = constructorItems;
      console.log('new arr 1', newArr);
      const dragItem = newArr[dragIndex];
      newArr.splice(dragIndex, 1);
      console.log('new arr 2', newArr);
      newArr.splice(hoverIndex, 0, dragItem);
      console.log('new arr 3', newArr);
      dispatch({ type: REWRITE_INGREDIENTS, payload: newArr });
    },
    [constructorItems]);

  const bun = constructorItems.find(item => item.type === 'bun');
  const otherItems = constructorItems.filter(item => item.type !== 'bun');
  const otherElements = otherItems.map((ingredient, index) => {
    return <BurgerConstructorItem data={ingredient} key={index} index={index + 1} moveItem={moveCard} />
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
        <BurgerConstructorItem data={bun} headItem index={1} moveItem={moveCard} />
      }
      {otherItems &&
        <div className={burgerConstructorStyles.items}>{otherElements}</div>
      }
      {bun &&
        <BurgerConstructorItem data={bun} tailItem index={1} moveItem={moveCard} />
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
import { memo, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import { ADD_INGREDIENT, DELETE_ORDER_ID, REWRITE_INGREDIENTS, placeOrder } from '../../services/actions/ingredients';
import { checkAuth } from '../../services/actions/user';
import { useHistory } from 'react-router-dom';

import burgerConstructorStyles from './burger-constructor.module.css';
import AppStateTypes from '../../services/types/app-state-types';

const BurgerConstructor: FC = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { constructorItems } = useSelector((state: AppStateTypes) => state.burger);
  const { currentOrderId } = useSelector((state: AppStateTypes) => state.order);
  const { currentUser } = useSelector((state: AppStateTypes) => state.user);
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredientData) {
      dispatch({ type: ADD_INGREDIENT, payload: ingredientData });
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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
    if (currentUser) {
      const order = {
        ingredients: constructorItems.map(item => item._id)
      };
      dispatch(placeOrder(order));
      setIsDetailsOpen(true);
    } else {
      history.push('/login');
    }
  }

  return (
    <div
      className={`${burgerConstructorStyles.container} ${isHover ? burgerConstructorStyles.bordered : ''}`}
      ref={dropTarget}
    >
      {isDetailsOpen && currentOrderId &&
        <Modal handleClose={closeOrder} heading='Ваш заказ'>
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

export default memo(BurgerConstructor);
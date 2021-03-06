import { memo, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import { addIngredientAction, rewriteIngredientsAction } from '../../services/actions/burger';
import { deleteOrderIdAction, placeOrder } from '../../services/actions/order';
import { checkAuth } from '../../services/actions/user';
import { useHistory } from 'react-router-dom';

import burgerConstructorStyles from './burger-constructor.module.css';
import TBurgersDataTypes from '../../services/types/t-burgers-data-types';

const BurgerConstructor: FC = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { constructorItems } = useSelector(state => state.burger);
  const { currentOrderId } = useSelector(state => state.order);
  const { currentUser } = useSelector(state => state.user);
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredientData: TBurgersDataTypes) {
      dispatch(addIngredientAction(ingredientData));
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
      dispatch(rewriteIngredientsAction(resultArr));
    },
    [constructorItems, dispatch, otherItems]);

  const otherElements = otherItems.map((ingredient, index) => {
    return <BurgerConstructorItem data={ingredient} key={ingredient.uuid} index={index} moveItem={moveCard} />
  });

  const orderTotalValue = useMemo(() => {
    if (constructorItems.length) {
      return constructorItems.reduce((sum, current) => sum += current.price, 0);
    }
  }, [constructorItems]);

  const closeOrder = () => {
    setIsDetailsOpen(false);
    dispatch(deleteOrderIdAction());
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
        <Modal handleClose={closeOrder} heading='?????? ??????????'>
          <OrderDetails orderId={currentOrderId}/>
        </Modal>
      }
      {bun &&
        <BurgerConstructorItem data={bun} headItem index={999} moveItem={moveCard} />
      }
      {otherItems.length > 0 &&
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
                ???????????????? ??????????
            </Button>
        </div>
      }
    </div>
  );
}

export default memo(BurgerConstructor);
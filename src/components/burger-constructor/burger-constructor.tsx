import React, { useEffect, useState } from 'react';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import OrderDetails from '../order-details/order-details';

import burgerConstructorStyles from './burger-constructor.styles.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgersDataTypes from '../../types/burgers-data-types';
import Modal from '../modal/modal';

type Props = {
  pickedItems: BurgersDataTypes[]
}

function BurgerConstructor(props: Props) {
  const [orderTotal, setOrderTotal] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { pickedItems } = props;
  const bun = pickedItems.find(item => item.type === 'bun');
  const otherItems = pickedItems.filter(item => item.type !== 'bun');
  const otherElements = otherItems.map((ingredient, index) => {
    return <BurgerConstructorItem data={ingredient} key={index}/>
  })

  useEffect(() => {
    if (pickedItems.length) {
      const orderValue = pickedItems.reduce((sum, current) => sum += current.price, 0);
      setOrderTotal(orderValue);
    }
  }, [pickedItems]);

  useEffect(() => {
    document.addEventListener('keydown', escapeClose);
    return () => {
      document.removeEventListener('keydown', escapeClose);
    }
  },[])

  const escapeClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDetailsOpen(false);
    }
  }

  const closeOrder = () => {
    setIsDetailsOpen(false);
  }

  const openOrder = () => {
    setIsDetailsOpen(true);
  }

  return (
    <div className={`${burgerConstructorStyles.container}`}>
      {isDetailsOpen &&
        <Modal handleClose={closeOrder}>
            <OrderDetails orderId={123123} />
        </Modal>
      }
      {bun &&
        <BurgerConstructorItem data={bun} headItem/>
      }
      {otherItems &&
        <div className={burgerConstructorStyles.items}>{otherElements}</div>
      }
      {bun &&
       <BurgerConstructorItem data={bun} tailItem/>
      }
      {pickedItems.length > 0 &&
        <div className={`${burgerConstructorStyles.price} pl-4 pr-4`}>
            <p className="text text_type_digits-medium">{orderTotal}</p>
            <CurrencyIcon type="primary"/>
            <Button type="primary" size="large" onClick={openOrder}>
                Оформить заказ
            </Button>
        </div>
      }
    </div>
  );
}

export default BurgerConstructor;
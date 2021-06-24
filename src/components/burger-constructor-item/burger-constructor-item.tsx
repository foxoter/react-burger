import React, {Component} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItemTypes from '../../types/burger-constructor-item-types';
import burgerConstructorItemStyles from './burger-constructor-item.styles.module.css'

class BurgerConstructorItem extends Component<BurgerConstructorItemTypes> {
  render() {
    const {data: {image, name, price}, headItem, tailItem} = this.props;
    const type = headItem ? "top" : tailItem ? "bottom" : undefined;
    const title = headItem ? `${name} (верх)` : tailItem ? `${name} (низ)` : name;
    return (
      <div className={`${burgerConstructorItemStyles.item} pl-4 pr-4`}>
        <DragIcon type='primary'/>
        <ConstructorElement
          type={type}
          isLocked={headItem || tailItem}
          text={title}
          price={price}
          thumbnail={image}
        />
      </div>
    )
  }
}

export default BurgerConstructorItem;
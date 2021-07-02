import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorItemStyles from './burger-constructor-item.styles.module.css';
import BurgersDataTypes from '../../types/burgers-data-types';

type Props = {
  data: BurgersDataTypes
  headItem?: boolean
  tailItem?: boolean
}

function BurgerConstructorItem(props: Props) {
  const { data: { image, name, price }, headItem, tailItem } = props;
  const type = headItem ? "top" : tailItem ? "bottom" : undefined;
  const title = headItem ? `${name} (верх)` : tailItem ? `${name} (низ)` : name;
  const dragIcon = !(headItem || tailItem);
  const uiKitSpacing = headItem || tailItem ? 'ml-8 pl-4 pr-4' : 'pl-4 pr-4';

  return (
    <div className={`${burgerConstructorItemStyles.item} ${uiKitSpacing}`}>
      {dragIcon && <DragIcon type='primary'/>}
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

export default BurgerConstructorItem;
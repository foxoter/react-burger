import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import BurgersDataTypes from '../../types/burgers-data-types';

import { DELETE_INGREDIENT } from '../../services/actions/ingredients';

type Props = {
  data: BurgersDataTypes
  headItem?: boolean
  tailItem?: boolean
}

function BurgerConstructorItem(props: Props) {
  const { data: { image, name, price, _id }, headItem, tailItem } = props;
  const type = headItem ? "top" : tailItem ? "bottom" : undefined;
  const title = headItem ? `${name} (верх)` : tailItem ? `${name} (низ)` : name;
  const dragIcon = !(headItem || tailItem);
  const uiKitSpacing = headItem || tailItem ? 'ml-8 pl-4 pr-4' : 'pl-4 pr-4';

  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructor-item',
    item: {_id},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const deleteIngredient = () => {
    dispatch({ type: DELETE_INGREDIENT, payload: _id});
  }

  const containerAttributes = {
    ...(!headItem && !tailItem && {ref: dragRef}),
    className: `${burgerConstructorItemStyles.item} ${uiKitSpacing}`
  }

  return (!isDrag ?
    <div {...containerAttributes}>
      {dragIcon && <DragIcon type='primary' />}
      <ConstructorElement
        type={type}
        isLocked={headItem || tailItem}
        text={title}
        price={price}
        thumbnail={image}
        handleClose={deleteIngredient}
      />
    </div> : null
  )
}

export default React.memo(BurgerConstructorItem);
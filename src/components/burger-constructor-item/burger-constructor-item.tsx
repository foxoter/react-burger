import React, { MutableRefObject, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { XYCoord } from 'dnd-core'

import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import BurgersDataTypes from '../../types/burgers-data-types';

import { DELETE_INGREDIENT } from '../../services/actions/ingredients';

type Props = {
  index: number
  data: BurgersDataTypes
  headItem?: boolean
  tailItem?: boolean
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

type DragItemProps = {
  _id: string
  index: number
}

function BurgerConstructorItem(props: Props) {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;
  const { moveItem, index, data: { image, name, price, _id }, headItem, tailItem } = props;
  const type = headItem ? "top" : tailItem ? "bottom" : undefined;
  const title = headItem ? `${name} (верх)` : tailItem ? `${name} (низ)` : name;
  const dragIcon = !(headItem || tailItem);
  const uiKitSpacing = headItem || tailItem ? 'ml-8 pl-4 pr-4' : 'pl-4 pr-4';

  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructor-item',
    item: () => {
      return {index}
    },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'constructor-item',
    hover(item: DragItemProps, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const deleteIngredient = () => {
    dispatch({ type: DELETE_INGREDIENT, payload: _id});
  }

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={`${burgerConstructorItemStyles.item} ${uiKitSpacing}`}
    >
      {dragIcon && <DragIcon type='primary' />}
      <ConstructorElement
        type={type}
        isLocked={headItem || tailItem}
        text={title}
        price={price}
        thumbnail={image}
        handleClose={deleteIngredient}
      />
    </div>
  )
}

export default React.memo(BurgerConstructorItem);
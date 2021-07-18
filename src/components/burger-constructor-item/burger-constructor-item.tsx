import React, { MutableRefObject, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import BurgersDataTypes from '../../types/burgers-data-types';

import { DELETE_INGREDIENT } from '../../services/actions/ingredients';

type Props = {
  index?: number
  data: BurgersDataTypes
  headItem?: boolean
  tailItem?: boolean
  moveItem?: (dragIndex: number, hoverIndex: number) => void
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
    item: {_id, index},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'constructor-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId
      }
    },
    hover(item: DragItemProps, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      console.log('dragIndex', dragIndex);
      console.log('hoverIndex', hoverIndex);
    },
    drop(id) {
      console.log('1', handlerId);
      console.log('2', id);
    }
  })

  const deleteIngredient = () => {
    dispatch({ type: DELETE_INGREDIENT, payload: _id});
  }

  dragRef(dropRef(ref));
  const containerAttributes = {
    ...(!headItem && !tailItem && {ref: ref}),
    className: `${burgerConstructorItemStyles.item} ${uiKitSpacing}`,
    ...(isDrag && { style: { opacity: '0'}})
  }

  return (
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
    </div>
  )
}

export default React.memo(BurgerConstructorItem);
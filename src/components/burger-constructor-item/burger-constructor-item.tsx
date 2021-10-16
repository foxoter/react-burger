import { memo, FC, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../services/hooks';
import { XYCoord } from 'dnd-core'

import burgerConstructorItemStyles from './burger-constructor-item.module.css';
import TBurgersDataTypes from '../../services/types/t-burgers-data-types';

import { deleteIngredientAction } from '../../services/actions/burger';

type Props = {
  index: number
  data: TBurgersDataTypes
  headItem?: boolean
  tailItem?: boolean
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

const BurgerConstructorItem: FC<Props> = (
  { moveItem,
    index,
    data: { image, name, price, _id },
    headItem,
    tailItem
  }) =>
{
  const ref = useRef<HTMLDivElement>(null);
  const type = headItem ? "top" : tailItem ? "bottom" : undefined;
  const title = headItem ? `${name} (верх)` : tailItem ? `${name} (низ)` : name;
  const dragIcon = !(headItem || tailItem);
  const uiKitSpacing = headItem || tailItem ? 'ml-8 pl-4 pr-4' : 'pl-4 pr-4';

  const dispatch = useDispatch();

  const deleteIngredient = () => {
    dispatch(deleteIngredientAction(_id));
  }

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'constructor-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: { index: number }, monitor) {
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
  });

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructor-item',
    item: () => {
      return { index }
    },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  });

  dragRef(dropRef(ref));
  const containerAttributes = {
    className: `${burgerConstructorItemStyles.item} ${uiKitSpacing}`,
    ...(!tailItem && !headItem && {ref: ref}),
    ...(isDrag && {style: { opacity: 0 }})
  }

  return (
    <div
      {...containerAttributes}
      data-handler-id={handlerId}
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

export default memo(BurgerConstructorItem);
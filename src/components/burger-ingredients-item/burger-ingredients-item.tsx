import React, { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgersDataTypes from '../../types/burgers-data-types';
import burgerIngredientStyles from './burger-ingredients-item.module.css';

type Props = {
  data: BurgersDataTypes
  onShowDetails: (ingredient: BurgersDataTypes) => void
}

function BurgerIngredientsItem(props: Props) {
  const [orderCount, setOrderCount] = useState(0);
  const { data, data: { image, name, price }, onShowDetails } = props

  return (
    <div className={`${burgerIngredientStyles.container} pl-4 pr-4`}
         onClick={() => onShowDetails(data)}>
      {orderCount > 0 &&
        <div className={burgerIngredientStyles.counter}>
            <Counter count={orderCount} size='default'/>
        </div>
      }
      <img src={image} alt={name} className='mb-1'/>
      <div className={`${burgerIngredientStyles.price} mb-1`}>
        <p className='mr-2 text text_type_digits-default'>{price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`${burgerIngredientStyles.title} text text_type_main-medium`}>{name}</p>
    </div>
  );
}

export default React.memo(BurgerIngredientsItem);
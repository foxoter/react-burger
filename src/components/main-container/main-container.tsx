import React, { useState } from 'react';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import mainContainerStyles from './main-container.module.css'
import BurgersDataTypes from '../../types/burgers-data-types';

type Props = {
  title: string
}

function MainContainer(props: Props) {
  const [constructorItems, setConstructorItems] = useState<BurgersDataTypes[]>([]);

  const addItem = (item: BurgersDataTypes) => {
    if (item.type === 'bun') {
      const filteredItems = constructorItems.filter((item: BurgersDataTypes) => item.type !== 'bun');
      setConstructorItems([...filteredItems, item]);
    } else {
      setConstructorItems([...constructorItems, item]);
    }
  }

  return (
    <main className={mainContainerStyles.main}>
      <h2 className="pt-10 mb-5 text text_type_main-large">
        {props.title}
      </h2>
      <section className={mainContainerStyles.container}>
        <BurgerIngredients onPickItem={addItem}/>
        <BurgerConstructor pickedItems={constructorItems}/>
      </section>
    </main>
  )
}

export default React.memo(MainContainer);
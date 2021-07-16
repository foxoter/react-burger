import React  from 'react';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import mainContainerStyles from './main-container.module.css'

type Props = {
  title: string
}

function MainContainer(props: Props) {
  return (
    <main className={mainContainerStyles.main}>
      <h2 className="pt-10 mb-5 text text_type_main-large">
        {props.title}
      </h2>
      <section className={mainContainerStyles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
    </main>
  )
}

export default React.memo(MainContainer);
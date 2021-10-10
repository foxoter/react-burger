import React  from 'react';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import mainContainerStyles from './main-container.module.css';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {
  title: string
}

function MainContainer(props: Props) {
  return (
    <div>
      <h2 className="pt-10 mb-5 text text_type_main-large">
        {props.title}
      </h2>
      <section className={mainContainerStyles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </div>
  )
}

export default React.memo(MainContainer);
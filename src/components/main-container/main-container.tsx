import { memo, FC } from 'react';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import mainContainerStyles from './main-container.module.css';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MainContainer: FC = () => {
  return (
    <>
      <h2 className="pt-10 mb-5 text text_type_main-large">
        Соберите Бургер
      </h2>
      <section className={mainContainerStyles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </>
  )
}

export default memo(MainContainer);
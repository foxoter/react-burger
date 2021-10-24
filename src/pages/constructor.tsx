import React, { FC, memo } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import MainContainer from '../components/main-container/main-container';

const Constructor: FC = () => {
  return (
    <MainContainer title='Соберите Бургер'>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </MainContainer>
  )
}

export default memo(Constructor);
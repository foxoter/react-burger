import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.styles.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import burgersData from '../../utils/burgers-data';
import BurgersDataTypes from '../../types/burgers-data-types';

const SUBTITLES: { [key: string]: string } = {
  "bun": "Булки",
  "main": "Начинки",
  "sauce": "Соусы"
}

type Props = {
  onPickItem: (item: BurgersDataTypes) => void
}

function BurgerIngredients(props: Props) {
  const [currentTab, setCurrentTab] = useState('Булки');

  const renderTabs = () => {
    return (
      <ul className={`${burgerIngredientsStyles.tabs} mb-10`}>
        <li>
          <Tab value="Булки" active={currentTab === 'Булки'} onClick={() => setCurrentTab('Булки')}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={() => setCurrentTab('Соусы')}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={() => setCurrentTab('Начинки')}>
            Начинки
          </Tab>
        </li>
      </ul>
    )
  }

  const renderIngredientsSection = (ingredient: string) => {
    const sectionData = burgersData.filter(item => {
      return item.type === ingredient
    })
    const elements = sectionData.map(ingredient => {
      return (
        <BurgerIngredientsItem key={ingredient._id} data={ingredient} onPurchase={props.onPickItem}/>
      )
    })
    const sectionTitle = SUBTITLES[ingredient]

    return (
      <div>
        <h3 className="text text_type_main-medium mb-6">{sectionTitle}</h3>
        <div className={`${burgerIngredientsStyles.items} mb-10 pl-4 pr-4`}>{elements}</div>
      </div>
    )
  }


  return (
    <div>
      {renderTabs()}
      <div className={burgerIngredientsStyles.sections}>
        {renderIngredientsSection('bun')}
        {renderIngredientsSection('sauce')}
        {renderIngredientsSection('main')}
      </div>
    </div>
  );
}

export default BurgerIngredients;
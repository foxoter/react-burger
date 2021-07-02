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

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: 'smooth'});
  }

  const renderTabs = () => {
    return (
      <ul className={`${burgerIngredientsStyles.tabs} mb-10`}>
        <li>
          <Tab value="Булки" active={currentTab === 'Булки'} onClick={() => switchTab('Булки')}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={() => switchTab('Соусы')}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={() => switchTab('Начинки')}>
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
      <div id={sectionTitle}>
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
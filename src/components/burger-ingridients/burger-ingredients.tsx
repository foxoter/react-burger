import React, { useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.styles.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import BurgersDataTypes from '../../types/burgers-data-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const SUBTITLES: { [key: string]: string } = {
  "bun": "Булки",
  "main": "Начинки",
  "sauce": "Соусы"
}

type Props = {
  onPickItem: (item: BurgersDataTypes) => void
  data: BurgersDataTypes[]
}

function BurgerIngredients(props: Props) {
  const [currentTab, setCurrentTab] = useState('Булки');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailedIngredient, setDetailedIngredient] = useState<BurgersDataTypes | null>(null);

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    document.addEventListener('keydown', escapeClose);
    return () => {
      document.removeEventListener('keydown', escapeClose);
    }
  },[])

  const escapeClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDetailsOpen(false);
    }
  }

  const closeDetails = () => {
    setIsDetailsOpen(false);
  }

  const openDetails = (data: BurgersDataTypes) => {
    props.onPickItem(data);
    setDetailedIngredient(data);
    setIsDetailsOpen(true);
  }

  const renderIngredientsSection = (ingredient: string) => {
    const sectionData = props.data.filter(item => {
      return item.type === ingredient
    })
    const elements = sectionData.map(ingredient => {
      return (
        <BurgerIngredientsItem key={ingredient._id} data={ingredient} onPurchase={() => openDetails(ingredient)}/>
      )
    })
    const sectionTitle = SUBTITLES[ingredient]

    return (
      <div id={sectionTitle}>
        {isDetailsOpen &&
          <Modal handleClose={closeDetails} withHeading>
            <IngredientDetails ingredient={detailedIngredient} />
          </Modal>
        }
        <h3 className="text text_type_main-medium mb-6">{sectionTitle}</h3>
        <div className={`${burgerIngredientsStyles.items} mb-10 pl-4 pr-4`}>{elements}</div>
      </div>
    )
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
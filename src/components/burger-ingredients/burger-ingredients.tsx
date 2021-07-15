import React, { useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import BurgersDataTypes from '../../types/burgers-data-types';
import AppState from '../../types/app-state-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getIngredients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailedIngredient, setDetailedIngredient] = useState<BurgersDataTypes | null>(null);

  const { ingredientsRequest, ingredientsFailed, ingredientsList } = useSelector((state: AppState) => state.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ingredientsList.length) dispatch(getIngredients());
  }, [dispatch, ingredientsList]);

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
    const sectionData = ingredientsList.filter(item => {
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
      {isDetailsOpen &&
        <Modal handleClose={closeDetails} heading={'Детали ингредиента'}>
            <IngredientDetails ingredient={detailedIngredient} />
        </Modal>
      }
      {renderTabs()}
      {!ingredientsRequest &&
        <div className={burgerIngredientsStyles.sections}>
          {renderIngredientsSection('bun')}
          {renderIngredientsSection('sauce')}
          {renderIngredientsSection('main')}
        </div>
      }
      {ingredientsFailed &&
        <p>Что-то пошло не так :(</p>
      }
    </div>
  );
}

export default React.memo(BurgerIngredients);
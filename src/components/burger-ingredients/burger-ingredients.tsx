import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import BurgersDataTypes from '../../types/burgers-data-types';
import AppStateTypes from '../../types/app-state-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getIngredients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_CURRENT_INGREDIENT, DELETE_CURRENT_INGREDIENT} from '../../services/actions/ingredients';

import { useHistory } from 'react-router-dom';

const SUBTITLES: { [key: string]: string } = {
  "bun": "Булки",
  "main": "Начинки",
  "sauce": "Соусы"
}

type RefsObjectType = {
  [key: string]: HTMLDivElement
}

function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState('Булки');
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const elemRefs = useRef({}) as MutableRefObject<RefsObjectType>;

  const {
    ingredientsRequest,
    ingredientsFailed,
    ingredientsList,
    currentIngredient,
  } = useSelector((state: AppStateTypes) => state.ingredients);
  const { constructorItems } = useSelector((state: AppStateTypes) => state.burger);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!ingredientsList.length) dispatch(getIngredients());
  }, [dispatch, ingredientsList]);

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

  const switchTab = (tab: string) => {
    setCurrentTab(tab);
    const el = document.getElementById(tab);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  const closeDetails = () => {
    dispatch({ type: DELETE_CURRENT_INGREDIENT });
  }

  const openDetails = (data: BurgersDataTypes) => {
    dispatch({ type: ADD_CURRENT_INGREDIENT, ingredient: data});
    history.push(`/ingredients/${data._id}`)
  }

  const renderIngredientsSection = (ingredient: string) => {
    const sectionData = ingredientsList.filter(item => {
      return item.type === ingredient
    })
    const elements = sectionData.map(ingredient => {
      const orderCount = constructorItems.filter(item => item._id === ingredient._id).length;
      return (
        <BurgerIngredientsItem
          key={ingredient._id}
          data={ingredient}
          onShowDetails={() => openDetails(ingredient)}
          count={orderCount}
        />
      )
    })
    const sectionTitle = SUBTITLES[ingredient];

    return (
      <div
        id={sectionTitle}
        ref={el => {
          if (el) elemRefs.current[sectionTitle] = el;
        }}
      >
        <h3 className="text text_type_main-medium mb-6">{sectionTitle}</h3>
        <div className={`${burgerIngredientsStyles.items} mb-10 pl-4 pr-4`}>{elements}</div>
      </div>
    )
  }

  const handleScroll = () => {
    const containerPosition = scrollContainerRef.current.getBoundingClientRect().top;
    let minDiff = Number.POSITIVE_INFINITY;
    let highlightedTab = '';
    Object.keys(elemRefs.current).forEach(key => {
      const ref = elemRefs.current[key];
      const tabPosition = ref.getBoundingClientRect().top;
      const diff = Math.abs(tabPosition - containerPosition);
      if (diff < minDiff) {
        minDiff = diff;
        highlightedTab = key;
      }
    });
    setCurrentTab(highlightedTab);
  }

  return (
    <div>
      {currentIngredient &&
        <Modal handleClose={closeDetails} heading={'Детали ингредиента'}>
            <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      }
      {renderTabs()}
      {!ingredientsRequest &&
        <div
          className={burgerIngredientsStyles.sections}
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
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
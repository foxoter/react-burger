import { memo, useState, useRef, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import TBurgersDataTypes from '../../services/types/t-burgers-data-types';
import AppStateTypes from '../../services/types/app-state-types';

import { useSelector, useDispatch } from 'react-redux';
import { ADD_CURRENT_INGREDIENT } from '../../services/actions/ingredients';

import { useHistory, useLocation } from 'react-router-dom';

const SUBTITLES: { [key: string]: string } = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы"
}

type RefsObjectType = {
  [key: string]: HTMLDivElement
}

const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState('Булки');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const elemRefs = useRef<RefsObjectType>({});

  const {
    ingredientsRequest,
    ingredientsFailed,
    ingredientsList,
  } = useSelector((state: AppStateTypes) => state.ingredients);
  const { constructorItems } = useSelector((state: AppStateTypes) => state.burger);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

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

  const openDetails = (data: TBurgersDataTypes) => {
    dispatch({ type: ADD_CURRENT_INGREDIENT, ingredient: data});
    history.push(`/ingredients/${data._id}`, { background: location, ingredient: data });
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
    if (scrollContainerRef && scrollContainerRef.current) {
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
  }

  return (
    <div>
      {renderTabs()}
      {!ingredientsRequest && ingredientsList.length > 0 &&
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

export default memo(BurgerIngredients);
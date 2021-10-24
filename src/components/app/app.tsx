import React, { useEffect } from 'react';
import appStyles from './app.module.css'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import MainContainer from '../main-container/main-container';
import { Login, Register, ForgotPassword, ResetPassword, Profile, NotFoundError } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientPage from '../../pages/ingredient';
import * as H from 'history';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import TBurgersDataTypes from '../../services/types/t-burgers-data-types';
import { useDispatch } from '../../services/hooks';
import { getIngredients } from '../../services/actions/ingredients';
import Feed from '../../pages/feed';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

type LocationState = {
  background?: H.Location
  ingredient?: TBurgersDataTypes
}

function App() {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const dispatch = useDispatch();
  let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
  const ingredient = location.state && location.state.ingredient;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app} id="app">
      <AppHeader/>
      <main className={appStyles.main}>
        <Switch location={background || location}>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/forgot-password'>
            <ForgotPassword />
          </Route>
          <Route path='/reset-password'>
            <ResetPassword />
          </Route>
          <ProtectedRoute path='/profile'>
            <Profile />
          </ProtectedRoute>
          <Route path='/' exact>
            <MainContainer title='Соберите Бургер'>
              <BurgerIngredients />
              <BurgerConstructor />
            </MainContainer>
          </Route>
          <Route path='/feed' exact>
            <MainContainer title='Лента заказов'>
              <Feed />
            </MainContainer>
          </Route>
          <Route path='/ingredients/:ingredientId'>
            <IngredientPage />
          </Route>
          <Route path='*'>
            <NotFoundError />
          </Route>
        </Switch>
        {background &&
          <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal heading='Детали ингредиента'>
                <IngredientDetails ingredient={ingredient}/>
              </Modal>
            }
          />
        }
      </main>
    </div>
  );
}

export default App;

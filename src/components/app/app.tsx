import React from 'react';
import appStyles from './app.module.css'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import MainContainer from '../main-container/main-container';
import { mainTitle } from '../../utils/menu-titles-data';
import { Login, Register, ForgotPassword, ResetPassword, Profile, NotFoundError } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import OrderHistory from '../../pages/order-history';
import IngredientPage from '../../pages/ingredient';
import * as H from 'history';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgersDataTypes from '../../types/burgers-data-types';

type LocationState = {
  background?: H.Location
  ingredient?: BurgersDataTypes
}

function App() {
  const location = useLocation<LocationState>();
  const history = useHistory();
  let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
  const ingredient = location.state && location.state.ingredient;

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
          <ProtectedRoute path='/profile' exact>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders'>
            <OrderHistory />
          </ProtectedRoute>
          <Route path='/' exact>
            <MainContainer title={mainTitle}/>
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
              <Modal>
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

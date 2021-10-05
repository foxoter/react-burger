import React from 'react';
import appStyles from './app.module.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../app-header/app-header';
import MainContainer from '../main-container/main-container';
import { mainTitle } from '../../utils/menu-titles-data';
import { Login, Register, ForgotPassword, ResetPassword, Profile, NotFoundError } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';

function App() {
  return (
    <Router>
      <div className={appStyles.app} id="app">
        <AppHeader/>
        <main className={appStyles.main}>
          <Switch>
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
            <ProtectedRoute path='/' exact>
              <MainContainer title={mainTitle}/>
            </ProtectedRoute>
            <Route path='*'>
              <NotFoundError />
            </Route>
          </Switch>
          </main>
      </div>
    </Router>
  );
}

export default App;

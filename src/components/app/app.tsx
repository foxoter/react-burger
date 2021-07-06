import React, { useEffect, useState } from 'react';
import appStyles from './app.module.css'

import AppHeader from '../app-header/app-header';
import MainContainer from '../main-container/main-container';
import { mainTitle } from '../../utils/menu-titles-data';

import { getProductsData } from '../../helpers/api';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductsData()
      .then(data => {
        setData(data.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className={appStyles.app} id="app">
      <AppHeader/>
      <MainContainer ingredients={data} title={mainTitle}/>
    </div>
  );
}

export default App;

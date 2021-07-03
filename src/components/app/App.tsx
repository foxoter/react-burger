import React, { useEffect, useState } from 'react';
import appStyles from './app.styles.module.css'

import AppHeader from '../app-header/app-header';
import MainContainer from '../main-container/main-container';

import { mainTitle } from '../../utils/menu-titles-data';

import { API_URL } from '../../constants/apiConfig';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setData(data.data);
      } catch (e) {
        console.log(e)
      }
    }
    getProductsData();
  }, [])

  return (
    <div className={appStyles.app} id="app">
      <AppHeader/>
      <MainContainer ingredients={data} title={mainTitle}/>
    </div>
  );
}

export default App;

import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.styles.module.css';

import HeaderItem from '../header-item/header-item';
import { menuItems } from "../../utils/menu-titles-data";

function AppHeader(): JSX.Element {
  const renderMenuItems = () => {
    return menuItems.map((item, idx) => {
      return (
        <HeaderItem
          key={idx}
          title={item}
        />
      )
    });
  }

  return (
    <header className={`${appHeaderStyles.container} p-4`}>
      <nav className={appHeaderStyles.navigation}>
        <ul className={appHeaderStyles.list}>
          <li className={appHeaderStyles.logo}>
            <Logo/>
          </li>
          {renderMenuItems()}
        </ul>
      </nav>
    </header>
  )
}

export default React.memo(AppHeader);
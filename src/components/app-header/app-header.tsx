import React, { FC } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.module.css';

import HeaderItem from '../header-item/header-item';
import { menuItems } from "../../services/constants/menu-titles-data";

const AppHeader: FC = () => {
  const renderMenuItems = () => {
    return menuItems.map((item, idx) => {
      return (
        <HeaderItem
          key={idx}
          title={item.title}
          Icon={item.Icon}
          path={item.path}
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
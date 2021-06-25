import React, {Component} from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';

import appHeaderStyles from './app-header.styles.module.css';

import HeaderItem from '../header-item/header-item';
import {menuItems} from "../../utils/menu-titles-data";

class AppHeader extends Component {
  state = {
    activeSection: 'Конструктор',
  }

  onSectionClick = (value: string) => {
    this.setState({activeSection: value});
  }

  render() {
    return (
      <header className={`${appHeaderStyles.container} p-4`}>
        <nav className={appHeaderStyles.navigation}>
          <ul className={appHeaderStyles.list}>
            <li className={appHeaderStyles.logo}>
              <Logo/>
            </li>
            {this.renderMenuItems()}
          </ul>
        </nav>
      </header>
    );
  }

  renderMenuItems() {
    return menuItems.map((item, idx) => {
      const isActive = item === this.state.activeSection;
      return (
        <HeaderItem
          key={idx}
          title={item}
          onClick={this.onSectionClick}
          isActive={isActive}
        />
      )
    });
  }
}

export default AppHeader;
import React, {Component} from 'react';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import headerItemStyles from './header-item.styles.module.css'
import HeaderItemTypes from '../../types/header-item-types';

class HeaderItem extends Component<HeaderItemTypes> {
  handleClick = (text: string) => {
    this.props.onClick(text);
  }

  render() {
    const {title, isActive} = this.props;
    const textActive = isActive ? headerItemStyles.text_active : ''
    const uiKitStyles = {
      listItem: 'pl-5 pr-5',
      text: 'ml-2 text text_type_main-medium',
    }

    return (
      <li
        className={`${headerItemStyles.item} ${uiKitStyles.listItem}`}
        onClick={() => this.handleClick(title)}
      >
        {this.renderIcon()}
        <p className={`${uiKitStyles.text} ${headerItemStyles.text} ${textActive}`}>
          {title}
        </p>
      </li>
    );
  }

  renderIcon() {
    const {title, isActive} = this.props;
    const type = isActive ? 'primary' : 'secondary'
    switch (title) {
      case('Конструктор'):
        return <BurgerIcon type={type}/>
      case('Лента заказов'):
        return <ListIcon type={type}/>
      case('Личный кабинет'):
        return <ProfileIcon type={type}/>
      default:
        return null
    }
  }
}

export default HeaderItem;
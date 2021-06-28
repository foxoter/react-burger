import React, {Component} from 'react';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import headerItemStyles from './header-item.styles.module.css'

type Props = {
  title: string
  isActive?: boolean
  onClick?: (a: string) => void
}

class HeaderItem extends Component<Props> {
  render() {
    const {title} = this.props;
    const uiKitStyles = {
      listItem: 'pl-5 pr-5',
      text: 'ml-2 text text_type_main-medium',
    }

    return (
      <li
        className={`${headerItemStyles.item} ${uiKitStyles.listItem}`}
      >
        {this.renderIcon()}
        <p className={`${uiKitStyles.text} ${headerItemStyles.text}`}>
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
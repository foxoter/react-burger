import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from "react-router-dom";


import headerItemStyles from './header-item.module.css'

type Props = {
  title: string
  Icon: any
  path: string
}

function HeaderItem(props: Props) {
  const { title, Icon, path } = props;
  const match = useRouteMatch(path);

  const iconType = match?.isExact ? 'primary' : 'secondary';

  const uiKitStyles = {
    listItem: 'pl-5 pr-5',
    text: 'ml-2 text text_type_main-medium',
  }

  return (
    <li
      className={uiKitStyles.listItem}
    >
      <NavLink
        exact
        to={path}
        className={`${uiKitStyles.text} ${headerItemStyles.link}`}
        activeClassName={headerItemStyles.link_active}
      >
        <Icon type={iconType} />
        {title}
      </NavLink>
    </li>
  );
}

export default React.memo(HeaderItem);
import React from 'react';

import headerItemStyles from './header-item.module.css'

type Props = {
  title: string
  isActive?: boolean
  onClick?: (a: string) => void
  Icon: any
}

function HeaderItem(props: Props) {
  const { title, isActive, Icon } = props;
  const iconType = isActive ? 'primary' : 'secondary';

  const uiKitStyles = {
    listItem: 'pl-5 pr-5',
    text: 'ml-2 text text_type_main-medium',
  }

  return (
    <li
      className={`${headerItemStyles.item} ${uiKitStyles.listItem}`}
    >
      <Icon type={iconType} />
      <p className={`${uiKitStyles.text} ${headerItemStyles.text}`}>
        {title}
      </p>
    </li>
  );
}

export default React.memo(HeaderItem);
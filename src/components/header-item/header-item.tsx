import { memo, FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from "react-router-dom";
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';


import headerItemStyles from './header-item.module.css'

type Props = {
  title: string;
  Icon: ({ type }: TIconProps) => JSX.Element;
  path: string;
}

const HeaderItem: FC<Props> = ({ title, Icon, path }) => {
  const match = useRouteMatch(path);
  console.log(typeof Icon);

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

export default memo(HeaderItem);
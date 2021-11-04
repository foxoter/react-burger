import { memo, FC, ChangeEvent, useCallback, useState, SyntheticEvent } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyles from './profile.module.css';
import profileMenuTitles from '../../services/constants/profile-menu-titles';
import { useDispatch, useSelector } from '../../services/hooks';
import { logoutUser, updateUserInfo } from '../../services/actions/user';
import OrderHistory from '../order-history';

const Profile: FC = () => {
  let { path, url } = useRouteMatch();
  const { currentUser } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    password: ''
  });

  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
  }

  const onCancel = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    if (currentUser) {
      setFormData({ name: currentUser.name, email: currentUser.email, password: '' });
    }
  }, [currentUser]);

  const logout = () => {
    dispatch(logoutUser());
  }

  const profileForm = (
    <div className={profileStyles.form_container}>
      <form className={profileStyles.form} onSubmit={submit}>
        <Input value={formData.name} onChange={onChange} placeholder={'Имя'} name={'name'}/>
        <Input value={formData.email} onChange={onChange} placeholder={'Логин'} name={'email'}/>
        <PasswordInput value={formData.password} onChange={onChange} name={'password'}/>
        <Button type='primary' size="medium">Сохранить</Button>
        <div onClick={onCancel}>
          <Button type='secondary' size="medium">Отмена</Button>
        </div>
      </form>
    </div>
  )

  return (
    <section className={profileStyles.container}>
      <div className={profileStyles.menu}>
        <nav className={profileStyles.navigation}>
          <ul className={profileStyles.list}>
            {profileMenuTitles.map((item, index) => {
              return (
                <li className={profileStyles.list_item} key={index}>
                  {item.type === 'navlink' ? (
                    <NavLink
                      exact
                      to={`${url}${item.path}`}
                      className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
                      activeClassName={profileStyles.link_active}
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    <button
                      onClick={logout}
                      className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
                    >
                      {item.title}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <p className='text text_type_main-default text_color_inactive'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Switch>
        <Route exact path={path}>
          {currentUser && profileForm}
        </Route>
        <Route exact path={`${path}/orders`}>
          <OrderHistory />
        </Route>
      </Switch>
    </section>
  )
}

export default memo(Profile);
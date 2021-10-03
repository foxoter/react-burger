import React, { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyles from './profile.module.css';
import profileMenuTitles from '../../utils/profile-menu-titles';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions/user';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  }

  const logout = () => {
    dispatch(logoutUser());
  }

  return (
    <section className={profileStyles.container}>
      <div className={profileStyles.menu}>
        <nav className={profileStyles.navigation}>
          <ul className={profileStyles.list}>
            {profileMenuTitles.map((item, index) => {
              return (
                <li className={profileStyles.list_item} key={index}>
                  {item.path ? (
                    <NavLink
                      to={item.path}
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
      <div className={profileStyles.form_container}>
        <form className={profileStyles.form} onSubmit={submit}>
          <Input value={formData.name} onChange={onChange} placeholder={'Имя'} name={'name'}/>
          <Input value={formData.email} onChange={onChange} placeholder={'Логин'} name={'email'}/>
          <PasswordInput value={formData.password} onChange={onChange} name={'password'}/>
          <Button type='primary' size="medium">Сохранить</Button>
        </form>
      </div>
    </section>
  )
}

export default React.memo(Profile);
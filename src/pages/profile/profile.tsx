import React, { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import profileStyles from './profile.module.css';

type ProfileData = {
  name: string
  email: string
  password: string
}

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  return (
    <section className={profileStyles.container}>
      <div className={profileStyles.menu}>
        <nav className={profileStyles.navigation}>
          <ul className={profileStyles.list}>
            <li className={profileStyles.list_item}>
              <NavLink
                to='/profile'
                className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={profileStyles.link_active}
              >
                Профиль
              </NavLink>
            </li>
            <li className={profileStyles.list_item}>
              <NavLink
                to='/profile/orders'
                className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={profileStyles.link_active}
              >
                История заказов
              </NavLink>
            </li>
            <li className={profileStyles.list_item}>
              <NavLink
                to='/logout'
                className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={profileStyles.link_active}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={profileStyles.form_container}>
        <form className={profileStyles.form}>
          <Input value={formData.name} onChange={onChange} placeholder={'Имя'} name={'name'}/>
          <Input value={formData.email} onChange={onChange} placeholder={'Логин'} name={'email'}/>
          <PasswordInput value={formData.password} onChange={onChange} name={'password'}/>
        </form>
      </div>
    </section>
  )
}

export default Profile;
import React, { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { on } from 'cluster';

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
    <section>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to='/profile'>Профиль</NavLink>
            </li>
            <li>
              <NavLink to='/profile/orders'>История заказов</NavLink>
            </li>
            <li>
              <NavLink to='/logout'>Выход</NavLink>
            </li>
          </ul>
        </nav>
        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <form>
          <Input value={formData.name} onChange={onChange} placeholder={'Имя'} name={'name'}/>
          <Input value={formData.email} onChange={onChange} placeholder={'Логин'} name={'email'}/>
          <PasswordInput value={formData.password} onChange={onChange} name={'password'}/>
        </form>
      </div>
    </section>
  )
}

export default Profile;
import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import loginStyles from './login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  }


  return (
    <section className={loginStyles.container}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form onSubmit={submit} className={loginStyles.form}>
        <EmailInput value={formData.email} name={'email'} onChange={onChange} />
        <PasswordInput value={formData.password} name={'password'} onChange={onChange} />
        <Button type='primary' size="medium">Войти</Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-6'>
        Вы — новый пользователь?{' '}
        <Link
          to='/register'
          className={`text text_type_main-default ${loginStyles.link}`}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?{' '}
        <Link
          to='/reset-password'
          className={`text text_type_main-default ${loginStyles.link}`}
        >
          Восстановить паролль
        </Link>
      </p>
    </section>
  )
}

export default Login;
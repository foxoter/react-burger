import React, { useState, ChangeEvent, useMemo, FC, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { TAuthFormData } from '../../services/types/auth-form-types';
import authFormStyles from './auth-form.module.css';

type Props = {
  type: string
  submitCallback?: any
}

const AuthForm: FC<Props> = ({ type, submitCallback }) => {
  let stateKeys;
  let buttonText;
  let title;
  switch (type) {
    case('login'):
      title = 'Вход'
      stateKeys = {email: '', password: ''}
      buttonText = 'Войти'
      break
    case('register'):
      title = 'Регистрация'
      stateKeys = {name: '', email: '', password: ''}
      buttonText = 'Зарегистрироваться'
      break
    case('forgot'):
      title = 'Восстановление пароля'
      stateKeys = {email: ''}
      buttonText = 'Восстановить'
      break
    case('reset'):
      title = 'Восстановление пароля'
      stateKeys = {password: '', token: ''}
      buttonText = 'Сохранить'
      break
  }
  const [formData, setFormData] = useState<TAuthFormData>({...stateKeys});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (submitCallback) {
      submitCallback(formData);
    }
  }

  const bottomLinks = useMemo(() => {
    switch (type) {
      case('login'):
        return (
          <>
            <p className='text text_type_main-default text_color_inactive mb-6'>
              Вы — новый пользователь?{' '}
              <Link
                to='/register'
                className={`text text_type_main-default ${authFormStyles.link}`}
              >
                Зарегистрироваться
              </Link>
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              Забыли пароль?{' '}
              <Link
                to='/forgot-password'
                className={`text text_type_main-default ${authFormStyles.link}`}
              >
                Восстановить паролль
              </Link>
            </p>
          </>
        )
      case('register'):
        return (
          <p className='text text_type_main-default text_color_inactive mb-6'>
            Уже зарегистрированы?{' '}
            <Link
              to='/login'
              className={`text text_type_main-default ${authFormStyles.link}`}
            >
              Войти
            </Link>
          </p>
        )
      case('forgot'):
      case('reset'):
        return (
          <p className='text text_type_main-default text_color_inactive mb-6'>
            Вспомнили пароль?{' '}
            <Link
              to='/login'
              className={`text text_type_main-default ${authFormStyles.link}`}
            >
              Войти
            </Link>
          </p>
        )
    }
  }, [type]);

  return (
    <section className={authFormStyles.container}>
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <form onSubmit={submit} className={authFormStyles.form}>
        {formData.name !== undefined && <Input value={formData.name} name={'name'} onChange={onChange} placeholder={'Имя'} />}
        {formData.email !== undefined && <EmailInput value={formData.email} name={'email'} onChange={onChange}/>}
        {formData.password !== undefined && <PasswordInput value={formData.password} name={'password'} onChange={onChange}/>}
        {formData.token !== undefined && <Input value={formData.token} name={'token'} onChange={onChange} placeholder={'Код из письма'}/>}
        <Button type='primary' size="medium">{buttonText}</Button>
      </form>
      {bottomLinks}
    </section>
  )
}

export default React.memo(AuthForm);